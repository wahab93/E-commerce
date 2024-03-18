import React from 'react';
import { ProductProvider } from './component/common/api/provider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';
import App from './App';

function Root() {
  return (
    <React.StrictMode>
      <ProductProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ProductProvider>
    </React.StrictMode>
  );
}

export default Root;
