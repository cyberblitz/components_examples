export default function MapRecord() {


    type Test = {
        testRecord: Record<string, { id: number; name: string }>;
        objectMap: Map<{ col: number; row: number }, { id: number; name: string }>; //this one suffers with memory object reference issues
        stringMap: Map<string, { id: number; name: string }>;
      };
      
      // Initializing the objects
      const obj1 = { id: 1, name: 'Alice' };
      const obj2 = { id: 2, name: 'Bob' };
      
      // Creating the testing object with testRecord and map
      const testing: Test = {
        testRecord: {
          "test1": obj1,
          "test2": obj2,
        },
        objectMap: new Map(),
        stringMap: new Map(),
      };
      
      // Adding values to testRecord
      testing.testRecord["test3"] = { id: 3, name: 'Charlie' };
      
      // Accessing values from testRecord
      console.log("testing.testRecord[test1]",testing.testRecord["test1"]); // Output: { id: 1, name: 'Alice' };
      console.log("testing.testRecord[test2]",testing.testRecord["test2"]); // Output: { id: 2, name: 'Bob' }
      console.log("testing.testRecord[test3]",testing.testRecord["test3"]); // Output: { id: 3, name: 'Charlie' }
      const key1 = { col: 1, row: 1 };
      const key2 = { col: 1, row: 1 };

      // Adding values to the Map

      testing.objectMap.set(key1, { id: 4, name: 'David' });
      testing.stringMap.set(JSON.stringify(key1), { id: 4, name: 'David' });

      testing.objectMap.set({ col: 2, row: 2 }, { id: 5, name: 'Eve' });
      testing.stringMap.set(JSON.stringify({ col: 2, row: 2 }), { id: 5, name: 'Eve' });

    //    each object { col: 1, row: 1 } is a different reference in memory, even if it has the same 
    //   structure and values. In JavaScript, objects are compared by reference, not by value. So the 
    //   key object in testing.map.set() and the key object in testing.map.get() are two separate instances,
    //    and they don't match because their references are different.
   
      // Accessing values from the Map
      console.log("testing.objectMap.get(key1)",testing.objectMap.get(key1)); 
      console.log("testing.objectMap.get({ col: 1, row: 1 })",testing.objectMap.get({ col: 1, row: 1 })); // Output: undefined (since object references differ in memory...)

      console.log("testing.stringMap.get({ col: 1, row: 1 })",testing.stringMap.get(JSON.stringify(key1))); // Output: this does not encounter memory issues)

      console.log("Array.from(testing.objectMap.entries())",Array.from(testing.objectMap.entries())); // To print map contents properly
      console.log("Array.from(testing.stringMap.entries())",Array.from(testing.stringMap.entries())); // To print map contents properly

      console.log("Array.from(testing.objectMap.keys()):", Array.from(testing.objectMap.keys())); // output:  [ { col: 1, row: 1 }, { col: 2, row: 2 } ]
      console.log("testing.stringMap.keys()",testing.stringMap.keys()) // output  :  [Map Iterator] { '{"col":1,"row":1}', '{"col":2,"row":2}' }
      // Using a reference to the same object to fetch value
     
      testing.objectMap.set(key2, { id: 6, name: 'Frank' });
      console.log("testing.objectMap.get(key)",testing.objectMap.get(key2)); // Output: { id: 6, name: 'Frank' }

      testing.stringMap.set(JSON.stringify(key2), { id: 6, name: 'Frank' });
      console.log("testing.stringMap.get(key)",testing.stringMap.get(JSON.stringify(key2))); // Output: { id: 6, name: 'Frank' }

        const map = new Map();
        map.set('apple', 1);
        map.set('banana', 2);
        map.set('cherry', 3);
        console.log("map.keys():",[map.keys()]); // Output:  [ [Map Iterator] { 'apple', 'banana', 'cherry' } ]

    return (
        <div>
            <h1>MapRecord</h1>
        </div>
    )
}