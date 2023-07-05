import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import VideoPlayer from './Components/VideoPlayer/index.jsx';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <VideoPlayer />
      </div>
    )
  }
}


