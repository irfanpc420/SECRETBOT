const axios = require("axios");
const m = require("moment-timezone");

module.exports = {
  config: {
    name: "bot",
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 5,
    role: 0,
    shortDescription: "Bot AI Response",
    category: "ai", // Updated category
    guide: {
      en: "{p}{n} bot [message]",
    },
  },

  onStart: async function () {},

  onChat: async function ({ api, args, event }) {
    const body = event.body.trim().toLowerCase();

    if (body.startsWith("bot")) {
      const query = body.slice(3).trim();

      if (!query) {
        return api.sendMessage(
          "Please ask a valid question after saying 'bot'.",
          event.threadID,
          event.messageID
        );
      }

      try {
        const response = await axios.get(
          `https://kaiz-apis.gleeze.com/api/gpt-4o?ask=${encodeURIComponent(query)}&uid=1&webSearch=off`
        );
        const content = response.data.response;

        return api.sendMessage(content, event.threadID, event.messageID);
      } catch (error) {
        console.error(`API error: ${error.message}`);
        return api.sendMessage(
          "Sorry, I couldn't get a response from the AI right now.",
          event.threadID,
          event.messageID
        );
      }
    }
  },
};
