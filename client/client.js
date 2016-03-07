import React from 'react';
import { render } from 'react-dom';
import '../shared/sass/style.scss';
import Router from '../shared/js/router';

const reactRoot = window.document.getElementById('react-root');

render(Router, reactRoot);
