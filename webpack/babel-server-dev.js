/*
 * babel-server-dev.js
 *
 * This requires babel-server and runs it in dev mode.
 * (dev mode makes the server aware of the webpack dev server
 * which handles hot loading)
 */

require('./babel-server.js')(true);
