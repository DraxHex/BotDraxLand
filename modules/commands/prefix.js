module.exports.config = {
    name: "    ",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Duy Cute UwU",
    description: "nothing",
    commandCategory: "Admin",
    usages: "",
    cooldowns:0
};

module.exports.run = async function({ api, event }) {
       let dny = ["Bạn đã biết.","Ngực là chân lý.","Gái gú chỉ là phù du. ","Bạn đang thở.","Bot MiLo không dùng sim để chém gió.","Trái đất hình vuông.","Chim cánh cụt có thể bay.","Đầu buồi.","Con Cặc.","Có cái lồn.","Địt mẹ mày.","Anh yêu em.","Hãy trao cho anh.","Á ĐÙ","F","Gần mực thì đen... còn gần em thì sao nhờ","Hoa đẹp cỡ nào ngắm suốt mười mấy năm cũng chán"];
       api.sendMessage('' + dny[Math.floor(Math.random()*dny.length)], event.threadID,event.messageID);
}