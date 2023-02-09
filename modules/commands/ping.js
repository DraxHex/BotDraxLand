module.exports.config = {
    name: "ping",
    version: "1.1.1",
    hasPermssion: 1,
    credits: "Mirai Team",
    description: "tag toàn bộ thành viên",
    commandCategory: "Group",
    usages: "ping [Text]",
    cooldowns: 5,
    info: [
        {
            key: 'Text',
            prompt: 'Nội dung để ping, có thể để trống',
            type: 'Văn Bản',
            example: 'Mọi người ơi'
        }
    ]
};

module.exports.run = async function({ api, event, args, Users }) {
    let threadInfo = await api.getThreadInfo(event.threadID);
    let all = threadInfo.participantIDs;
    all.splice(all.indexOf(api.getCurrentUserID()), 1);
    all.splice(all.indexOf(event.senderID), 1);
    let name = await Users.getNameUser(event.senderID);
    var job = [ `${name} đã thêm bạn vào nhóm. `, `${name} đã xoá bạn khỏi nhóm. ` , `${name} đã thêm bạn làm quản trị viên của nhóm. ` , `${name} đã thay đổi màu sắc cuộc trò chuyện thành…` , `${name} Dậy Đi Các Con Vợ ❤️ ` ];
    var body = args.join(" ") || `${job[Math.floor(Math.random() * job.length)]}`, mentions = [];
    for (let i = 0; i < all.length; i++) {
        if (i == body.length) body += body.charAt(body.length - 1);
        mentions.push({
            tag: body[i],
            id: all[i],
            fromIndex: i - 1
        });
    }
    api.sendMessage({ body: `${body}`, mentions }, event.threadID, async (err, info) => {
        await new Promise(resolve => setTimeout(resolve, 60 * 1000));
        api.unsendMessage(info.messageID);
    }, event.messageID);
}