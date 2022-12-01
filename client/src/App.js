// import './App.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import React, {Component} from 'react';
// // import UploadFile from "./Components/Upload-file"
// import VideoPlayer from './Components/VideoPlayer/index.jsx';
// import io from "socket.io-client";

// const socket = io.connect("http://43.226.26.53:10200");
// // const socket = io.connect("https://mv.enxing.cf/api");
// // const socket = io.connect("https://mv.enxing.cf/socket.io");
// export default class App extends Component {
//   state = {room: "", username: ""}
//   joinRoom = () => {
//     const { room } = this.state
//     if (room !== "") {
//       socket.emit("join_room", room);
//       // setShowChat(true);
//     }
//   }

//   render() {
//     return (
//       <div >
//         <div> 
//           <input type="text" placeholder='Room Number' onChange={(e)=>{this.setState({room:e.target.value})}}></input>
//           <input type="text" placeholder='username' onChange={(e)=>{this.setState({username:e.target.value})}}></input>
//           <button onClick={this.joinRoom}>Join A Room</button>
//         </div>
//         <VideoPlayer socket={socket} room={this.state.room} username={this.state.username} />
   
//         {/* <UploadFile /> */}
//       </div>
//     )
//   }
// }


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


