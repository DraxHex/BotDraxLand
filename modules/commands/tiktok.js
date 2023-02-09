module.exports.config = {
  name: "tiktok",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "BePhuc",
  description: "lấy video tiktok no logo",
  commandCategory: "video",
  usages: "[url]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const { createReadStream, unlinkSync, writeFileSync } = require("fs-extra");
    if (args[0] == "audio") {
      try {
        const { threadID, messageID } = event;
        const path = __dirname + `/cache/tikaudio.mp3`;
        const { data } = await axios.get(
          `https://sumiproject.projectsumi.repl.co/tiktok/mp3?url=${args[1]}`
        );
        if (data.status != "success")
          return api.sendMessage(
            `Audio không được tìm thấy. Vui lòng nhập URL video TikTok.`,
            event.threadID,
            event.messageID
          );
        api.sendMessage(
          `[ DOWNLOAD AUDIOTIKTOK ]`,
          event.threadID,
          async (error, info) => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return api.unsendMessage(info.messageID);
          }
        );
        const getAudio = (
          await axios.get(data.downloadUrls, {
            responseType: "arraybuffer",
          })
        ).data;
        fs.writeFileSync(path, Buffer.from(getAudio, "utf-8"));
        return api.sendMessage(
          { body: data.title, attachment: fs.createReadStream(path) },
          threadID,
          () => fs.unlinkSync(path),
          messageID
        );
      } catch (e) {
        console.log(e);
        return api.sendMessage(
          `Không thể xử lý yêu cầu`,
          event.threadID,
          event.messageID
        );
      }
    } else if (args[0] == "video") {
      try {
        const { threadID, messageID } = event;
        const path1 = __dirname + `/cache/tikvideo.mp4`;
        const { data } = await axios.get(
          `https://sumiproject.projectsumi.repl.co/tiktok/video?url=${args[1]}`
        );
        if (data.status != "success")
          return api.sendMessage(
            `Audio không được tìm thấy. Vui lòng nhập URL video TikTok.`,
            event.threadID,
            event.messageID
          );
        api.sendMessage(
          `[ DOWNLOAD VIDEOTIKTOK ]`,
          event.threadID,
          async (error, info) => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return api.unsendMessage(info.messageID);
          }
        );
        const getVideo = (
          await axios.get(data.downloadUrls, {
            responseType: "arraybuffer",
          })
        ).data;
        fs.writeFileSync(path1, Buffer.from(getVideo, "utf-8"));
        return api.sendMessage(
          { body: data.title, attachment: fs.createReadStream(path1) },
          threadID,
          () => fs.unlinkSync(path1),
          messageID
        );
      } catch (e) {
        console.log(e);
        return api.sendMessage(
          `Không thể xử lý yêu cầu`,
          event.threadID,
          event.messageID
        );
      }
    } else if (args[0] == "info") {
      if (!args[0]) return api.sendMessage("có cái nịt", event.threadID);
      let data;
      try {
        data = (await axios.get(encodeURI(`https://sumiproject.projectsumi.repl.co/tiktok/info?user=${args[1]}`))).data;
        const {nickname,verified,uniqueId,avatarLarger,signature,privateAccount,bioLink,} = data.userInfo.user;
        const { followerCount, followingCount, heartCount } =
          data.userInfo.stats;
        const pathSaveAvatar = __dirname + `/cache/avatarTikTok${nickname}.png`;
        const getAvt = (
          await axios.get(avatarLarger, { responseType: "arraybuffer" })
        ).data;
        fs.writeFileSync(pathSaveAvatar, Buffer.from(getAvt));
        api.sendMessage(
          {
            body:
              `===「USERNAME TIKTOK」===` +
              `\n🤓 Tên: ${nickname}` +
              `\n🔖 ID: ${uniqueId}` +
              `\n${
                privateAccount
                  ? "🔒 Tài khoản riêng tư: có"
                  : "🔓 Tài khoản riêng tư: không"
              }` +
              `\n👀 Người theo dõi: ${followerCount}` +
              `\n♻️ Đang theo dõi: ${followingCount}` +
              `\n💗 Lượt tim: ${heartCount}` +
              `\n📝 Tiểu sử: ${signature}` +
              `\n📎 Bio link: ${bioLink ? bioLink.link : "Không có"}` +
              `\n✅ Tích xanh: ${verified ? "có" : "không"}`,
            attachment: fs.createReadStream(pathSaveAvatar),
            url: `https://tiktok.com/@${uniqueId}`,
          },
          event.threadID,
          (e, info) => fs.unlinkSync(pathSaveAvatar),
          event.messageID
        );
        console.log(data);
      } catch (e) {
        console.log(e);
        return api.sendMessage(
          "Đã xảy ra lỗi vui lòng thử lại sau",
          event.threadID,
          event.messageID
        );
      }
    } else if(args[0] == "trend") {
      var { data : trend } = await axios.get("https://sumiproject.projectsumi.repl.co/tiktok/trending/VN/6")
      var msg = "", num = 1, dataTrend = []
      for(let value of trend.data) {
        msg += (`${num++}/ Title: ${value.title}\nViews: ${value.play_count}\nComment: ${value.comment_count}\nShare: ${value.share_count}\nDownload: ${value.download_count}\nAuthor: ${value.author.nickname}\n\n`);
        dataTrend.push({
          title: value.title,
          views: value.play_count,
          comment: value.comment_count,
          share: value.share_count,
          download: value.download_count,
          author: value.author.nickname,
          cover: `https://www.tiktok.com/@${value.author.unique_id}/video/${value.video_id}`
        })
      }
      var body = `»TRENDING TIK TOK:\n\n${msg}» Hãy reply(phản hồi) chọn một trong những trending trên`
      return api.sendMessage({
        body: body
      }, String(event.threadID), (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          dataTrend
      })
    })
  }
  }
  module.exports.handleReply = async function({api, event, getUser, getThread, handleReply}) {
   const axios = require("axios")
   const fs = require("fs-extra")
   api.unsendMessage(handleReply.messageID)
   var { data } = await axios.get(encodeURI("https://sumiproject.projectsumi.repl.co/tiktok/video?url="+ handleReply.dataTrend[event.body - 1].cover))
   const path1 = __dirname + `/cache/tikvideo${event.senderID}.mp4`;
   await global.utils.downloadFile(data.Data.downloadUrls, path1)
   return api.sendMessage({
     attachment: fs.createReadStream(path1)
   }, event.threadID, () => fs.unlinkSync(path1), event.messageID);  
  }