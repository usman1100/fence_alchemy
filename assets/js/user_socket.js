import { Socket } from "phoenix";

let socket = new Socket("/socket", { params: { token: window.userToken } });

socket.connect();

let channel = socket.channel("markers:all", {});
channel
  .join()
  .receive("ok", (resp) => {
    console.log("Joined successfully", resp);
  })
  .receive("error", (resp) => {
    console.log("Unable to join", resp);
  });

channel.on("markers:new", () => {
  // alert("new connection");
});

map.on("click", () => {
  channel.push("markers:new", { body: "new connection" });
});

export default socket;
