import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
//import "bootstrap/dist/css/bootstrap.min.css"; // react bootstrap import
const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById("root")
);
