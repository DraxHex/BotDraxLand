module.exports.config = {
    name: "noprefix",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Phúc",
    description: "",
    commandCategory: "noprefix",
    usages: "",
    cooldowns: 0,
    denpendencies: {}
};

module.exports.handleEvent = async ({ event, api, Users }) => {

    const fs = global.nodemodule["fs-extra"];
    var { threadID, messageID, body, senderID } = event;
    const thread = global.data.threadData.get(threadID) || {};
    var user = global.data.allUserID || {};
    if (typeof user["noprefix"] !== "undefined" && user["noprefix"] == false) return; 
    if (typeof thread["noprefix"] !== "undefined" && thread["noprefix"] == false) return;
    function out(data) {
        api.sendMessage(data, threadID, messageID)
    }
      if (event.body.indexOf("Prefix")==0 || (event.body.indexOf("prefix")==0)) {
      let name = await Users.getNameUser(event.senderID);
    return api.sendMessage({body: `Chào ${name}\nPrefix bot là: [ ${global.config.PREFIX} ]`, mentions: [{ tag: name, id: event.senderID }]},threadID, messageID);
 }
};
module.exports.run = function({  }) { }