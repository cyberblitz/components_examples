type Test = {
    testRecord: Record<number, { id: number; name: string }>;
    map: Map<{ col: number; row: number }, { id: number; name: string }>;
  };
  
  // Initializing the objects
  const obj1 = { id: 1, name: 'Alice' };
  const obj2 = { id: 2, name: 'Bob' };
  
  // Creating the testing object with testRecord and map
  const testing: Test = {
    testRecord: {
      0: obj1,
      1: obj2,
    },
    map: new Map(),
  };
  
  // Adding values to testRecord
  testing.testRecord[2] = { id: 3, name: 'Charlie' };
  
  // Accessing values from testRecord
  console.log(testing.testRecord[1]); // Output: { id: 2, name: 'Bob' }
  console.log(testing.testRecord[2]); // Output: { id: 3, name: 'Charlie' }
  
  // Adding values to the Map
  testing.map.set({ col: 1, row: 1 }, { id: 4, name: 'David' });
  testing.map.set({ col: 2, row: 2 }, { id: 5, name: 'Eve' });
  
  // Accessing values from the Map
  console.log(testing.map.get({ col: 1, row: 1 })); // Output: undefined (since object references differ)
  console.log(Array.from(testing.map.entries())); // To print map contents properly
  
  // Using a reference to the same object to fetch value
  const key = { col: 1, row: 1 };
  testing.map.set(key, { id: 6, name: 'Frank' });
  console.log(testing.map.get(key)); // Output: { id: 6, name: 'Frank' }
  