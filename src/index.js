import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.scss';
import { ApolloProvider, client } from "./Utils/Apollo";


/* CSS */
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'));
