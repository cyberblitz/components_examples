import sql from 'mssql';

// Step 1: Define SQL Server configuration
const dbConfig = {
  user: "dbUser",
  password: "V0yagers1.",
  database: "Test",     // Your database name
  server: "192.168.0.152",  // Your SQL Server instance
  port: 1433, // Add this line explicitly
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};


const BEARER_TOKEN = '57a6645140dc4fb35feb566d1893bb9cd98b8fe61e21e552821a468004c4195b'



//Vehicle Data = 'https://www.teslafi.com/history.php?command=drives'
//Drive Data = 'https://www.teslafi.com/history.php?command=drives'
//Charge Data = 'https://www.teslafi.com/history.php?command=charges'


// Step 2: Fetch data from the API using `fetch`
async function fetchDataFromAPI() {
  try {
    const response = await fetch('https://www.teslafi.com/history.php?command=charges', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${BEARER_TOKEN}`,  // Add Bearer token here
        'Content-Type': 'application/json'  // Include content-type if needed
      }
    });
    const apiData = await response.json();  // Parse the API response to JSON

    return apiData;  // Return the parsed data
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return null;
  }
}

// Infer SQL Data Types
function inferSQLType(value: any): string {
  if (typeof value === 'string') {
    return 'NVARCHAR(MAX)';
  } else if (typeof value === 'number') {
    if (Number.isInteger(value)) {
      return 'INT';
    } else {
      return 'FLOAT';
    }
  } else if (typeof value === 'boolean') {
    return 'BIT';
  } else if (value instanceof Date) {
    return 'DATETIME';
  }
  return 'NVARCHAR(MAX)';
}

// Create SQL Table dynamically
async function createSQLTable(data: any) {

  const dataArray = data.results

// console.log(dataArray)


  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    console.error('Invalid data to create table');
    return;
  }

  const firstRow = dataArray[0];
  let createTableQuery = 'CREATE TABLE ApiDataTable (\n';

  console.log(firstRow)

  // Dynamically generate column definitions
  for (const [key, value] of Object.entries(firstRow)) {
    const sqlType = inferSQLType(value);
    createTableQuery += `  ${key} ${sqlType},\n`;
  }

  createTableQuery = createTableQuery.slice(0, -2); // Remove last comma
  createTableQuery += '\n);';

  console.log('Generated SQL Query:');
  console.log(createTableQuery);

  // Execute the query on SQL Server
  try {
    const pool = await sql.connect(dbConfig);
    await pool.request().query(createTableQuery);
    console.log('Table created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

// Step 3: Insert the fetched data into SQL Server
// Insert Data into SQL Table
async function insertDataIntoTable(data: any) {
  const dataArray = data.results;

  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    console.error('No data to insert');
    return;
  }

  try {
    const pool = await sql.connect(dbConfig);

    for (const row of dataArray) {
      const columns = Object.keys(row).join(', ');
      const values = Object.values(row).map((val) => {
        if (typeof val === 'string') {
          // Replace single quotes in the value and ensure it's returned correctly
          return `'${val.replace(/'/g, "''")}'`;
        }
        return val;
      }).join(', ');

      const insertQuery = `INSERT INTO ApiDataTable (${columns}) VALUES (${values});`;
      
      await pool.request().query(insertQuery);
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}



// Step 4: Main function to call the fetch and insert functions
 export default async function main() {
  const apiData = await fetchDataFromAPI();  // Fetch the data from API
  
  if (apiData) {

    await createSQLTable(apiData);
    await insertDataIntoTable(apiData);

   // await insertDataToSQLServer(apiData);  // Insert data into SQL Server
  }
}

// Step 5: Call the main function
main();
