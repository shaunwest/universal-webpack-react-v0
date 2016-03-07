//import React from 'react';
//import ReactDOM from 'react-dom/server';

//import routes from '../shared/js/routes';

//import {Router} from 'react-router';
//import Main from '../shared/js/main';

//import { RouterContext } from 'react-router';

export default (reactString, cssLink, assetUrl = 'http://localhost:1335') => {
    //const reactString = ReactDOM.renderToString(React.createElement(Main));
    //const reactString = ReactDOM.renderToString(React.createElement(Router, props));
    //const reactString = ReactDOM.renderToString(<RouterContext {...props}/>);

    return `
      <!doctype html>
      <html lang='en-us'>
          <head>
              <meta charset='utf-8'>
              <title>Universal</title>
              <link rel='shortcut icon' href='/favicon.ico'>
              ${ cssLink }
          </head>
          <body>
              <div id='react-root'>${ reactString }</div>
          </body>
          <script src="${ assetUrl }/dist/client.js"></script>
      </html>
      `;
}
