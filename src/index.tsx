import ReactDOM from 'react-dom/client';
import AppRouter from './Router.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@redux/store.ts';

import 'react-toastify/dist/ReactToastify.css'; // import toast css
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ToastContainer />
      <AppRouter />
    </PersistGate>
  </Provider>,
);
