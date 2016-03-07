import koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';

import colors from 'colors';
import env from '../webpack/env.js';
import buildIndex from './index';

import React from 'react';
//import ReactDOM from 'react-dom/server';
import { renderToString } from 'react-dom/server';

import { match, RouterContext } from 'react-router';
//import createLocation from 'history/lib/createLocation';
//import createMemoryHistory from 'history/lib/createMemoryHistory';

import { routes } from '../shared/js/routes';

const app = koa();
const staticDir = __dirname + '/../static';

function getCssLink(devMode, externalCss) {
    if (devMode) {
        return (externalCss) ? `<link rel="stylesheet" href="${ assetUrl }/dist/style.css">` : '';
    } else {
        return `<link rel="stylesheet" href="/dist/style.css">`;
    } 
}

function run(devMode, externalCss) {
    const assetUrl = devMode ? 'http://' + env.watchServerHostname + ':' + env.watchServerPort : '';
    const cssLink = getCssLink(devMode, externalCss);

    app.use(serve(staticDir, { defer: false }));
    app.use(koaBody({ multipart: true }));

    app.use(function *() {
        //createLocation(this.path);
        //const history = createHistory();
        //const loc = history.createLocation(this.path);
        //const history = createMemoryHistory();
        //console.log(loc);
        yield (callback => {
            match({ routes: routes, location: this.path }, (error, redirect, props) => {
                //props.history = history;
                this.type = 'text/html';
                const reactString = renderToString(<RouterContext {...props} />);
                this.body = buildIndex(reactString, cssLink, assetUrl);
                callback(null);
            });
        });
    });

    app.listen(env.port, () => 
        console.info(`👉  ${ colors.magenta('Server is listening @') } ${ colors.bold.magenta('http://%s:%s') }`, env.hostname, env.port)
    );
}

module.exports = run;
