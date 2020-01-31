import React from 'react';
import ReactDOM from 'react-dom';

import { StoreProvider } from './contex/repo/contex';
import App from './App';
import './index.scss';
import { ApolloProvider, client } from "./utils/Apollo";


/* CSS */
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ApolloProvider>, document.getElementById('root'));
