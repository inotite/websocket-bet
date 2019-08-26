import { serverConnect } from "../../core/serverSocket";
import * as WebSocket from "ws";

const start = () => {
        serverConnect("bet365", true)
            .then((socket) => {
                console.log("Get Socket");
                socket.on("message", (response) => {
                    console.log("server-grab-event");
                    console.log(response);
                });
            })
            .catch((err) => {
                console.log("Error: ", err);
            });

        const ws = new WebSocket('wss://premws-pt2.365lpodds.com/zap/?uid=1392700366739863', {
            origin: 'https://www.bet365.com'
        });

        ws.on('open', function open() {
            // ws.send('something');
        });
           
        ws.on('message', function incoming(data) {
            console.log(data);
        });
    }


export { start };