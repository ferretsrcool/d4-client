import React from 'react';
import ReactDOM from 'react-dom';
import Monitor from './Monitor';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(<Monitor />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
