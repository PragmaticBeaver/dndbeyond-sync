const socketId = "module.dndbeyond-sync";

Hooks.on("init", () => {
    console.log("dndbeyond-sync init");
    game.socket.on(socketId, _handleMsg);
});

Hooks.on("ready", () => {
    console.log("dndbeyond-sync ready");
    game.socket.emit(socketId, "hello world");
});

function _handleMsg(...args) {
    console.log("received msg!");
    console.log(args);
}
