import { Suspense } from "react";

// Usage:
/*
import DataFetcher from "@/app/components/(bjorn)/data-fetcher/DataFetcher";

function MyFunction({myData}) {

return (
  <>
  </>
  );
}

export default function ComponentName() {
  return (
    <DataFetcher endpoint="path">
      {(whateverParam) => <MyFunction myData={whateverParam}/>}
    </DataFetcher>
  );
}
*/

// Async function to load data, taking in the variables "endpoint" and "children".
// will pass the json object to const data, and pass that to children.
async function LoadData({ endpoint, children }) {
  // Uses the try catch method of retrieving data.
  // Try Catch is a method of attempting to execute an initial block of code, and if it fails, will Catch the error message.

  // The try {} is the initial block of code to be executed
  try {
    // Attempt to fetch data with a given endpoint (e.g. "events" so url is localhost:4000/events);
    const response = await fetch(`http://localhost:4000/${endpoint}`);

    // If the fetch returns as an error status (e.g. 404), throws a new Error object to be rendered in Catch
    // with the message "Failed to load {endpoint}"
    if (!response.ok) {
      throw new Error(`Failed to load ${endpoint}`);
    }

    // If we didn't get any errors, sets const result as the json object
    const data = await response.json();

    return <>{children(data)}</>;
  } catch (error) {
    // But, if an exception is throw in the try block, we catch any error messages, and returns the message as div.
    return <div>Error: {error}</div>;
  }
}

export default function DataFetcher({ endpoint, children }) {
  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <LoadData endpoint={endpoint}>{children}</LoadData>
    </Suspense>
  );
}
