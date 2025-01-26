const axios = require("axios");
const m = require("moment-timezone");
module.exports = {
  config: {
    name: "gpt",
    version: "1.0",
    author: "Romim",
    countDown: 5,
    role: 0,
    shortDescription: "gemini",
    category: "npx gemini",
    guide: {
      en: "{p}{n}",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, args, event }) {
    const body = event.body.trim().toLowerCase();
     const Time = m.tz('Asia/Dhaka');
      const time = Time.format('MMMM D, YYYY h:mm A');
    if (event.threadID !== 8008566255928114) {
       // console.log("This command is not allowed in this thread.");
    
    if (body.startsWith("ai")||body.startsWith("gpt")) {
      const Romim = args.join(" ");

      try {
        const response = await axios.get(`https://www.noobz-api.rf.gd/api/gpt4?value=${encodeURIComponent(Romim)}`);
        const content = response.data.data;

        return api.sendMessage(`Here's Results: \n${content}\ntime:-\n${time}✅`, event.threadID, (error, info) => {
          if (error) return console.error(`Failed to send message: ${error.message}`);

          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
          });
        });
      } catch (error) {
        console.error(`Failed to get an answer: ${error.message}`);
        api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
      }
    }
    }
  },

  onReply: async function ({ api, event }) {
    const reply = event.body.toLowerCase();
    const replyData = global.GoatBot.onReply.get(event.messageReply.messageID); 
     const hTime = m.tz('Asia/Dhaka');
      const gtime = hTime.format('MMMM D, YYYY h:mm A');
    if (replyData && replyData.author == event.senderID) {
      try {
        const response = await axios.get(`https://www.noobz-api.rf.gd/api/gpt4?value=${encodeURIComponent(reply)}`);
        const AY = response.data.data;

        await api.sendMessage(`Here's Results : ${AY}\ntime-\n${gtime}✅`, event.threadID,(error, info) => {
              if (error) return console.error(`Failed to send message: ${error.message}`);
              global.GoatBot.onReply.set(info.messageID, {
                commandName: this.config.name,
                type: "reply",
                messageID: info.messageID,
                author: event.senderID,
              });
            },
            event.messageID);

      } catch (error) {
        console.error(`Failed to get an answer: ${error.message}`);
        api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
      }
    }
  }
};
