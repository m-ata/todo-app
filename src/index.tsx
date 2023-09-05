import ReactDOM from "react-dom/client";
import AppRouter from "./Router.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
