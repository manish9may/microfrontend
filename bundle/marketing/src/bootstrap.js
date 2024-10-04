import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const histroy =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  if (onNavigate) histroy.listen(onNavigate);
  ReactDOM.render(<App history={histroy} />, el);
  return {
    onParentNavigate({ pathname: nextPathName }) {
      const { pathname } = histroy.location;
      if (pathname != nextPathName) {
        histroy.push(nextPathName);
      }
      console.log("Container just navigate");
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
