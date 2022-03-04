import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./checkout/Checkout";
import { Provider as FetchProvider } from "use-http";
import Invoice from "./invoice/Invoice";
import Completed from "./completed/Completed";

function App() {
  // const [count, setCount] = useState("");

  // useEffect(() => {
  //   const source = new EventSource("http://localhost:3001/invoice/8");

  //   function onMessage({ data: json }: { data: string }) {
  //     const { count } = JSON.parse(json);
  //     setCount(count);
  //   }

  //   source.addEventListener("message", onMessage);

  //   return () => {
  //     source.removeEventListener("message", onMessage);
  //   };
  // }, []);

  return (
    <FetchProvider url="http://localhost:3001">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Checkout />} />
          <Route path="/:id" element={<Invoice />} />
          <Route path="/:id/completed" element={<Completed />} />
        </Routes>
      </BrowserRouter>
    </FetchProvider>
  );
}

export default App;
