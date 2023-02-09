module.exports.config = {
    name: "cardinfo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Dũngkon", 
    description: "Xem info của bạn",
    commandCategory: "image",
    usages: "",
    cooldowns: 3,
    dependencies: {
        "axios": "",
        "fs-extra": ""
    }
    
};
module.exports.run = async function ({ api, event }) {
  let { senderID, threadID, messageID } = event;
  const fs = global.nodemodule["fs-extra"];
  const axios = global.nodemodule["axios"];
  let pathImg = __dirname + `/cache/${senderID}123${threadID}.png`;

if(event.type == "message_reply") { uid = event.messageReply.senderID }
    else uid = event.senderID;
let info = (
    await axios.get(encodeURI(`https://sumiproject.projectsumi.repl.co/card_info?uid=${uid}`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(info, "utf-8"));
return api.sendMessage({body: "Done✅",
     attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
}