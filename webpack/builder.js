import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import env from './env';

export function compile(options, cb) {
    console.activity('Compiling');

    webpack(options.config)
        .run(function(err, stats) {
            if (cb) {
                cb(err, stats);
            }
            console.success('Compile finished');
        });
}

export function watch(options, cb) {
    const noInfo = !options.loud;
    
    // If not linking external css, use the webpack import method
    // (which will hotload css changes)
    if (!options.externalCss) {
        options.config.module.loaders[0] = {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        };
    }

    console.activity('Compiling');

    const serverCompiler = webpack(options.config);

    const server = new WebpackDevServer(serverCompiler, {
        hot: true,
        contentBase: '../static',
        inline: true,
        quiet: false, // true = don't output anything to console, false = output it
        noInfo: noInfo, // hide output except for errors (?)
        filename: 'client.js',
        watchOptions: {
            aggregateTimeout: 200,
            poll: 100
        },
        publicPath: env.watchServerUrl + '/dist/',
        headers: {'Access-Control-Allow-Origin': '*'},
        stats: { colors: true },
        host: env.watchServerHostname
    });

    server.listen(env.watchServerPort, env.watchServerHostname, err => {
        console.success('Compile finished. One moment...');

        if (cb) {
            cb(err, env.watchServerHostname, env.watchServerPort);
        } else {
            console.log('Webpack Server listening @ http://' + env.watchServerUrl);
        }
    });
}
