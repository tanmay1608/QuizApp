import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router/Router.jsx";
import { store } from "../redux/store.js"
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router />
  </Provider>
);
