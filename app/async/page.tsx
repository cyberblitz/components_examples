"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";




export default function AsyncTest() {
  // State to store the result of the async operation
  const [extractedData, setExtractedData] = useState(null);
  const [extractedData2, setExtractedData2] = useState(null);

    const searchParams = useSearchParams();
    const category = searchParams.get('start');
    const author = searchParams.get('end');

  // Async function to fetch the data
  const fetchData = async () => {
    const result = await data1();  // Wait for the data
    setExtractedData(result);     // Store the result in state
  };


  const fetchData2 = async () => {
    const result = await data2();  // Wait for the data
    setExtractedData2(result);     // Store the result in state
  };

  // useEffect to call the async function when the component mounts
  useEffect(() => {
    fetchData();  // Call the async function
    fetchData2()
  }, []);

  console.log("extractedData:", extractedData);  // This will log `null` initially, then the fetched data after state updates
  console.log("extractedData2:", extractedData2);  // This will log `null` initially, then the fetched data after state updates
  return (
    <>
      <div>Data: {extractedData ? JSON.stringify(extractedData) : "Loading..."}</div>
    </>
  );
}

// Simulated data fetching function
function data1(): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 1, name: "test" });
    }, 2000); // 2000ms delay (2 seconds)
  });
}

async function data2(): Promise<any> {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1'); // Fetch data
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parse JSON from response
      return data; 
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
