const GameTable = require("./GameTable");
const User = require("../model/User");

class Player {
  constructor(soketio, gameSocket) {
    this.soketio = soketio;
    this.gameSocket = gameSocket;
    this.currentTable = undefined;
    this.currentSit = undefined;
    this.user = undefined;

    gameSocket.on("disconnect", this.disconnectFromTable);

    gameSocket.on("leaveTalbe", this.disconnectFromTable);
    gameSocket.on("joinTable", this.joinTable);
    gameSocket.on("createTable", this.currentTable);
    gameSocket.on("sitTable", this.sitTable);

    /** 배팅은 나중에 */
    // gameSocket.on("fold", this.fold);
    // gameSocket.on("check", this.check);
    // gameSocket.on("raise", this.raise);
    // gameSocket.on("call", this.call);
    // gameSocket.on("bet", this.bet);

    // this.initChat();
  }
}

// initChat = () => {
//   this.gameSocket.on("videoCallTable", (data) => {
//     console.log("call mode");

//     this.soketio.to(data.userToCall).emit("callIncoming", {
//       signal: data.signalData,
//       from: data.from,
//     });
//   });

//   this.gameSocket.on("acceptCall", (data) => {
//     console.log("call accepted");
//     this.socketio.to(data.to).emit("callAccepted", data.signal);
//   });
// };

joinActiveTable = (data) => {
  this.disconnectFromTable();
  var { tableId } = data;

  var tableRoom = this.socketio.sockets.adapter.roms.get(tableId);
  var table = activeTables[tableId];

  if (tableRoom === undefined || table === undefined) {
    this.gameSocket.emit("status", "incorrect");
    // 내용 보충 필요
  }
};
