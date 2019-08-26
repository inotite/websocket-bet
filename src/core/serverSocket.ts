/* eslint-disable @typescript-eslint/no-var-requires */
const io = require("socket.io-client");
const axios = require("axios");
const fs = require("fs");
import { IOMessage, AppError } from "../model";
const host = "185.205.209.7";
const port = 3005;
let socket;

const serverConnect = (bookmaker: string, live: boolean) =>
  new Promise<SocketIOClient.Socket>((resolve, reject) => {
    axios
      .post(`http://${host}:${port + 1}/login`, {
        username: "Grabber",
        key: "111111"
      })
      .then(response => {
        if (!response || !response.data || !response.data.token)
          throw new Error("invalid response");
        socket = io(`http://${host}:${port}?token=${response.data.token}`);

        socket.on("connect", () => {
          console.log("server socket connected");
          if (socket.connected) {
            socket.emit(
              "message",
              { msg_type: "user-join", context: { bookmaker, live } },
              (data: IOMessage) => {
                if (data.error) {
                  reject(data.error);
                }
                resolve(socket);
              }
            );
          }
        });

        socket.on("error", () => {
          socket.connect();
          //error between server and client, reconnect. aslo you need handle the ping timeout and other cases, please refer to iosocket at client app
        });
        socket.on("reconnect", (attemptNumber: number) => {});
        socket.on("connect_error", (error: AppError) => {
          console.log("connect_error", error);
        });
        socket.on("connect_timeout", (timeout: string) => {
          console.log("connect_timeout", timeout);
        });
        socket.on("disconnect", (reason: string) => {
          console.warn("disconnect", reason);
          if (reason === "io server disconnect") {
            // the disconnection was initiated by the server, you need to reconnect manually
            console.log("io server disconnect");
            socket.connect();
          }
          // else the socket will automatically try to reconnect
        });
        socket.on("reconnecting", (attemptNumber: number) => {});
        socket.on("reconnect_failed", () => {
          console.log("reconnect_failed");
        });

        socket.on("reconnect_error", (error: AppError) => {
          console.log("reconnect_error", error);
        });
      })
      .catch(error => {
        reject(error);
      });
  });

const sendMessage = (message: IOMessage) => {
  if (!message || !message.msg_type) {
    throw new Error("invaid message data");
  }
  if (!socket || !socket.connected) {
    throw new Error("socket closed");
  }

  //console.debug("sent", message);
  //fs.appendFileSync("sentLog", new Date().toString() + JSON.stringify(message));
  socket.emit("message", message);
};

export { serverConnect, sendMessage };
