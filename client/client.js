import React from 'react';
import ReactDOM from 'react-dom';

import '../shared/sass/style.scss';

import Main from '../shared/js/main';

const reactRoot = window.document.getElementById('react-root');

ReactDOM.render(React.createElement(Main), reactRoot);
