import React, { Component } from 'react'
import io from "socket.io-client";

const socket = io("https://mv.enxing.cf", {
    path: "/socket.io"
});

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = { videoFilePath: '', room: "", username: "", hasUserAction: false, isSeeking: false, inRec: false, showVideo: false, showRoom: false }
    }
    joinRoom = () => {
        const { room } = this.state
        if (room !== "") {
            this.setState({ showVideo: true })
            socket.emit("join_room", room);
        }
    }
    inputVideo = React.createRef();
    videoPlaying = React.createRef();
    componentDidMount() {
        this.recMessage();
    }

    sendMessage = async (e) => {
        await socket.emit("send_message", e);
    };
    wrapperSendMessage = () => {
        let playing = "pause"
        if (!this.videoPlaying.current.paused) playing = "play"
        const videoState = { room: this.state.room, username: this.state.username, control: playing, currentTime: this.videoPlaying.current.currentTime };
        // console.log("sendMess", videoState,  new Date().getTime() )
        this.sendMessage(videoState)
    }
    recMessage = (e) => {
        socket.on("receive_message", (data) => {
            const { hasUserAction, isSeeking } = this.state;
            // console.log("hasUserAction: ", hasUserAction, "rec:", data, new Date().getTime())
            if (hasUserAction || isSeeking) return;
            let c = this.videoPlaying.current.currentTime;
            if (data.control === "pause") this.videoPlaying.current.pause();
            else if (data.control === "play") {
                this.videoPlaying.current.play()
            }
            if (Math.abs(c - data.currentTime) < 2) return;
            // console.log("enter promise")
            new Promise((resolve, reject) => {
                this.setState({ inRec: true })
                this.videoPlaying.current.currentTime = data.currentTime;
                // console.log("set true inrec")
                resolve()
            }).then(() => {
                setTimeout(() => {
                    this.setState({ inRec: false })
                }, 500)
                // console.log("set false inrec")
            })

            // console.log("exit promise") 
        });
    }
    isClick = false;
    // stop socket recieve: recMessage()
    stopRec = e => {
        // console.log("click0---------")
        if (this.state.inRec) return;
        // console.log("click1---------")
        if (this.isClick) return;
        this.isClick = true;
        // console.log("click stop Rec", new Date().getTime() )
        this.setState({ hasUserAction: true })
        setTimeout((e) => {
            this.isClick = false;
            this.setState({ hasUserAction: false })
            // console.log("sleeped done ", new Date().getTime() )
        }, 3000)
    }

    handleVideoUpload = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        this.setState({ videoFilePath: URL.createObjectURL(fileObj), showRoom: true}, () => {
            // console.log("setstate", this.state.videoFilePath)
        });
    };
    handleClick = () => {
        // 👇️ open file input box on click of other element
        this.inputVideo.current.click();
    };
    handleVideoUpdate = e => {
        // console.log("update beg", new Date().getTime() )
        if (this.videoPlaying.current.seeking) {
            this.setState({ isSeeking: true })
            // console.log("update end", new Date().getTime())
            return
        }
        this.setState({ isSeeking: false })
        this.wrapperSendMessage();
    }

    render() {
        return (
            <div className='joinChatContainer'>
                {!this.state.showRoom ?
                    (
                        <>
                            <input ref={this.inputVideo} style={{ display: 'none' }} type="file" accept="video/*" onChange={this.handleVideoUpload} />
                            <button onClick={this.handleClick}>Open a video file</button>
                        </>
                    ) :
                    (
                        !this.state.showVideo ? (
                            <div  className='joinChatContainer'>
                                <input type="text" placeholder='Room Number' onChange={(e) => { this.setState({ room: e.target.value }) }} ></input>
                                <input type="text" placeholder='Username' onChange={(e) => { this.setState({ username: e.target.value }) }}></input>
                                <button onClick={this.joinRoom}>Join a Room</button>
                            </div>
                        ) :
                            <video id="enxing" ref={this.videoPlaying} controls autoPlay src={this.state.videoFilePath}
                                onSeeked={this.stopRec}
                                onClick={this.stopRec}
                                onPlaying={this.handleVideoPlaying}
                                onTimeUpdate={this.handleVideoUpdate}
                                width="100%" height="100%" type="video/mp4" />
                    )
                }
            </div>
        )
    }
}