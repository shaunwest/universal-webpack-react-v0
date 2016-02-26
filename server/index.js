import React from 'react';
import ReactDOM from 'react-dom/server';

import Main from '../shared/js/main';

export default (cssLink, assetUrl = 'http://localhost:1335') => {
    const reactString = ReactDOM.renderToString(React.createElement(Main));

    return `<!doctype html>
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
        <script>
          var dataStore = {};
        </script>
        <script src="${ assetUrl }/dist/client.js"></script>
    </html>`;
}
