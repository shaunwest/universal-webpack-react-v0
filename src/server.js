import koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';

import React from 'react';
import ReactDOM from 'react-dom/server';

import format from '../builder/format';
import foo from './foo';

const app = koa();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 1336;
const appRoot = __dirname + '/..';

function run(externalCss) {
  app.use(serve(appRoot + '/static', { defer: false }));
  app.use(koaBody({ multipart: true }));

  const cssLink = (externalCss) ?
    `<link rel='stylesheet' href='http://localhost:8080/dist/style.css'>` :
    '';

  app.use(function *() {
      yield (callback => {
          const reactString = ReactDOM.renderToString(React.createElement(foo));

          this.type = 'text/html';
          this.body = (
              `<!doctype html>
              <html lang='en-us'>
                  <head>
                      <meta charset='utf-8'>
                      <title>Universal</title>
                      <link rel='shortcut icon' href='/favicon.ico'>
                      ${ cssLink }
                  </head>
                  <body>
                      <h1>Hello!!</h1>
                      <div id='react-root'>${ reactString }</div>
                  </body>
                  <script>
                    var dataStore = {};
                  </script>
                  <script src="http://localhost:8080/dist/client.js"></script>
              </html>`
          );
          callback(null);
      });
  });

  app.listen(port, () => console.log(format.go('Server is listening @ http://%s:%s'), hostname, port));
}

module.exports = run;
