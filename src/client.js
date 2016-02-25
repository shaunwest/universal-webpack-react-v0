import React from 'react';
import ReactDOM from 'react-dom';

import './sass/style.scss';

import foo from './lib/foo';

const reactRoot = window.document.getElementById('react-root');

ReactDOM.render(React.createElement(foo), reactRoot);
