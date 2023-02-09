module.exports.config = {
    name: "age",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Dũngkon", 
    description: "",
    commandCategory: "Tiện ích",
    usages: " ",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args,}) {
  const axios = global.nodemodule["axios"];
const { threadID, messageID, senderID } = event;
  var out = (msg) => api.sendMessage(msg, threadID, messageID);
  if (!args.join(" ")) return out("Thiếu Uid tài khoản");
  if (event.type == "message_reply") text  = event.messageReply.senderID
else text = args.join(" ");
const data = await axios.get(`https://apidungkonuser.dungkonuwu.repl.co/date?date=${text}`)

return api.sendMessage(`+ Tuổi của bạn là: ${data.years} tuổi\n+Bạn Sống Được\n${data.days} ngày\n${data.weeks} tháng\n${data.years} năm\n${data.hours} giờ\n${data.minutes} phút\n${data.seconds} giây\n+Đếm ngược ngày sinh nhật của bạn còn lại\n${data.days1} ngày\n${data.weeks1} tháng\n${data.hours1} giờ\n${data.minutes1} phút\n${data.seconds1} giây`, event.threadID)
};