import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, LocaleProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux'; 
import App from './app/App';
import { system } from './theme/theme';
import { store } from './app/store'; 
import '@fontsource/rubik/400.css';   
import '@fontsource/rubik/700.css';   


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocaleProvider locale="he-IL">
      <Provider store={store}>
        <ChakraProvider value={system}>
          <App />
        </ChakraProvider>
      </Provider>
    </LocaleProvider>
  </React.StrictMode>
);
