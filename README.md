# sync-video-player

## How to do sync?
### Websocket
* use socket.io
### Algorithm:
* <video\> has a onTimeUpdate function. Everytime it emits a new time and send to server.
    * Master slave mode: linear data package over users number in the server
        * Master client send updates and slave clients receive.
    * equal mode: square data package over users number in the server
        * each clients send updates and calculate time to play: such pick maxium


## Bug fixed
### 
* socket.io & nginx reverse & wss fail
    * client
    ```node
    // const socket = io.connect("https://mv.enxing.cf/socket.io"); // failed
    const socket = io("https://mv.enxing.cf", {
        path: "/socket.io"
    });
    ```

    * nginx
    ```nginx
        location /socket.io {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    
        proxy_pass http://127.0.0.1:10200;
    
        # redirect all HTTP traffic to localhost:8088;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        #proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    ```