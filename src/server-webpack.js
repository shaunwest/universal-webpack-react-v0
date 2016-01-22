import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import koaBody from 'koa-body';
import serve from 'koa-static';
import log from '../builder/log';
import path from 'path';
//const app = koa();
const APP_ROOT = path.join(__dirname,  '/../');

const config = {
    target: 'web',
    cache: false,
    context: APP_ROOT,
    devtool: false,
    entry: './src/client',
    output: {
        path: path.join(APP_ROOT, 'static/dist'),
        filename: 'client.js',
        chunkFilename: '[name].[id].js',
        publicPath: 'dist/'
    },
    plugins: [
        new webpack.DefinePlugin({ __SERVER__: false })
    ],
    module:  {
        loaders: [
            { test: /\.css$/, loaders: ['style', 'css'] },
            { test: /\.json$/, loaders: ['json'] },
            { test: /\.js$/, loaders: ['babel?cacheDirectory&presets[]=es2015&presets[]=react&presets[]=stage-0'], exclude: /node_modules/ }
        ],
        postLoaders: [],
        noParse: /\.min\.js/
    }
};

const app = new WebpackDevServer(webpack(config), {
  contentBase: './static',
  hot: true,
  historyApiFallback: true,
});

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 1336;
const appRoot = __dirname + '/..';

app.use(serve(appRoot + '/static', { defer: false }));
app.use(koaBody({ multipart: true }));

app.use(function *() {
    yield (callback => {
        const reactString = 'HELLO!';

        this.type = 'text/html';
        this.body = (
            `<!doctype html>
            <html lang='en-us'>
                <head>
                    <meta charset='utf-8'>
                    <title>Universal</title>
                    <link rel='shortcut icon' href='/favicon.ico'>
                </head>
                <body>
                    <div id='react-root'>${ reactString }</div>
                </body>
                <script>
                  var dataStore = {};
                </script>
            </html>`
        );
        callback(null);
    });
});

app.listen(port, () => {
    log.success('Server is listening');
    log.go('Go to http://%s:%s', hostname, port);
});
