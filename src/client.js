import React from 'react';
import ReactDOM from 'react-dom';

//import './style.css';
import foo from './foo';

const reactRoot = window.document.getElementById('react-root');

ReactDOM.render(React.createElement(foo), reactRoot);