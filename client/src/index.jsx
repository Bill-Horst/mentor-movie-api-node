import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return <MainView/>;
      }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);