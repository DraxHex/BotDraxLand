module.exports.config = {
    name: "info",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Juong",
    description: "Kiểm tra thông tin người dùng",
    commandCategory: "general",
    usages: "Nó sẽ lấy avt của chính bạn.\n/test @Tag => nó sẽ lấy info người bạn tag",
    cooldowns: 5,
  };
  
  module.exports.run = async({ api, event, args, client, Users, __GLOBAL,Currencies}) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
      if (args.join() == "") {
      var mentions = event.senderID
      console.log(mentions)
      const res = await axios.get(`https://botviet.me/api/info?id=${mentions}`);
      var id = res.data.info.url ? `${res.data.info.id}` : "Fb ghẻ vc";
      var fl = res.data.info.follow ? `${res.data.info.follow}` : "Không công khai";
      var hh = res.data.info.relationship ? `${res.data.info.relationship}` : "...";
      var birthday = res.data.info.birthday ? `${res.data.info.birthday}` : "Không công khai";
      var dc = res.data.info.location ? `${res.data.info.location}` :"Không công khai";
      var no = res.data.info.hometown ? `${res.data.info.hometown}` : "Không công khai";
      var sex = res.data.info.gender ? `${res.data.info.gender}` : "Không công khai";
      var cc = res.data.info.url ? `${res.data.info.url}` : "Fb ghẻ vc";
      let data = await api.getUserInfo(mentions);
      let url = data[mentions].profileUrl;
      let name = await data[mentions].name;
      var content = args.join(" ");
      var callback = () => api.sendMessage({
        body: `» Tên : ${name}\n» inbox : m.me/${id}\n» Ngày sinh : ${birthday}\n» Giới tính : ${sex}\n» Follow : ${fl}\n» Quê quán : ${dc}\n» Thành phố : ${no}\n» Hiện Đang ${hh}\n» Link fb : ${cc}` , attachment: fs.createReadStream(__dirname + "/cache/1.png")
      }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
      return request(encodeURI(`https://botviet.me/api/avt?id=${mentions}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
      }
      else if (args.join().indexOf('@') !== -1) {
      var mentions = Object.keys(event.mentions)
      const res = await axios.get(`https://botviet.me/api/info?id=${mentions}`);
      var id = res.data.info.url ? `${res.data.info.id}` : "Fb ghẻ vc";
      var fl = res.data.info.follow ? `${res.data.info.follow}` : "Không công khai";
      var hh = res.data.info.relationship ? `${res.data.info.relationship}` : "...";
      var birthday = res.data.info.birthday ? `${res.data.info.birthday}` : "Không công khai";
      var dc = res.data.info.location ? `${res.data.info.location}` :"Không công khai";
      var no = res.data.info.hometown ? `${res.data.info.hometown}` : "Không công khai";
      var sex = res.data.info.gender ? `${res.data.info.gender}` : "Không công khai";
      var cc = res.data.info.url ? `${res.data.info.url}` : "Fb ghẻ vc";
      let data = await api.getUserInfo(mentions);
      let name = await data[mentions].name;
      var content = args.join(" ");
      var callback = () => api.sendMessage({
        body:`» Tên : ${name}\n» inbox : m.me/${id}\n» Ngày sinh : ${birthday}\n» Giới tính : ${sex}\n» Follow : ${fl}\n» Quê quán : ${dc}\n» Thành phố : ${no}\n» Hiện Đang ${hh}\n» Link fb : ${cc}` ,  attachment: fs.createReadStream(__dirname + "/cache/1.png")
      }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
      return request(encodeURI(`https://botviet.me/api/avt?id=${mentions}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
  }
  
  }