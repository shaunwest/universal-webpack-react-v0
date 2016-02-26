import koa from 'koa';
import koaBody from 'koa-body';
import serve from 'koa-static';

import colors from 'colors';
import env from '../webpack/env.js';
import buildIndex from './index';

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
        yield (callback => {
            this.type = 'text/html';
            this.body = buildIndex(cssLink, assetUrl);
            callback(null);
        });
    });

    app.listen(env.port, () => 
      console.info(`👉  ${ colors.magenta('Server is listening @') } ${ colors.bold.magenta('http://%s:%s') }`, env.hostname, env.port)
    );
}

module.exports = run;
