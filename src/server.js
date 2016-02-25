import koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';

import React from 'react';
import ReactDOM from 'react-dom/server';

import colors from 'colors';
import buildIndex from './index';
import foo from './lib/foo';

const app = koa();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 1336;
const webpackHostname = process.env.WEBPACK_HOSTNAME || 'localhost';
const webpackPort = process.env.WEBPACK_PORT || 1335;
const assetUrl = 'http://' + webpackHostname + ':' + webpackPort;
const staticDir = __dirname + '/../static';

function run(externalCss) {
    app.use(serve(staticDir, { defer: false }));
    app.use(koaBody({ multipart: true }));

    const cssLink = (externalCss) ?
        `<link rel="stylesheet" href="${ assetUrl }/dist/style.css">` :
        '';

    app.use(function *() {
        yield (callback => {
            const reactString = ReactDOM.renderToString(React.createElement(foo));

            this.type = 'text/html';
            this.body = buildIndex(reactString, cssLink, assetUrl);
            callback(null);
        });
    });

    app.listen(port, () => console.go(colors.magenta('Server is listening @ ') + colors.bold.magenta('http://%s:%s'), hostname, port));
}

module.exports = run;
