module.exports.config = {
    name: "f",
    eventType: ["log:link-status", "log:magic-words", "log:thread-color", "log:thread-approval-mode", "log:thread-poll", "log:thread-icon"],
    version: "1.0.0",
    credits: "a",
    description: ""
};
module.exports.run = async function({ api, event, Users, Threads }) {
    const { threadID, logMessageType, logMessageData } = event;
    switch (logMessageType) {
        case "log:thread-color":
            {
                return api.sendMessage(`Nhóm đã thay đổi chủ đề thành: ${event.logMessageData.magic_word || event.logMessageData.accessibility_label }\nEmoij: ${event.logMessageData.theme_emoji || "Không có emoji"}`, threadID)
            }
        case "log:magic-words":
            {
                return api.sendMessage(`Theme ${event.logMessageData.magic_word} đã thêm hiệu ứng: ${event.logMessageData.theme_name}\nEmoij: ${event.logMessageData.emoji_effect || "Không có emoji"}\nTổng ${event.logMessageData.new_magic_word_count} hiệu ứng từ ngữ được thêm vào`, threadID)
            }
        case "log:thread-poll":
            {
                var str = event.logMessageData.question_json
                var obj = JSON.parse(str);
                if (event.logMessageData.event_type == "question_creation") {
                    return api.sendMessage(`${event.logMessageBody}`, threadID)
                }
                if (event.logMessageData.event_type == "update_vote") {
                    return api.sendMessage(`${event.logMessageBody}`, threadID)
                }
            }
        case "log:thread-approval-mode":
            {
                return api.sendMessage(event.logMessageBody, threadID)
            }
        case "log:thread-icon":
            {
                return api.sendMessage(event.logMessageBody, threadID)
            }
    }
}