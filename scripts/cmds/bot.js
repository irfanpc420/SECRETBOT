const axios = require("axios");
const m = require("moment-timezone");

module.exports = {
  config: {
    name: "bot", // Updated name to bot
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 5,
    role: 0,
    shortDescription: "Bot AI Response",
    category: "chat",
    guide: {
      en: "{p}{n} bot [message]",
    },
  },

  onStart: async function () {},

  onChat: async function ({ api, args, event }) {
    const body = event.body.trim().toLowerCase();
    const Time = m.tz("Asia/Dhaka");
    const time = Time.format("MMMM D, YYYY h:mm A");

    // Check if the message starts with "bot"
    if (body.startsWith("bot")) {
      const query = body.slice(3).trim(); // Remove "bot" from the message to get the query
      if (!query) {
        return api.sendMessage(
          `কিরে কি কবি তারাতাড়ি ক 😒`,  // Custom response when no query is provided
          event.threadID,
          event.messageID
        );
      }

      try {
        // Make API call with the query
        const response = await axios.get(
          `https://www.noobz-api.rf.gd/api/gpt4?value=${encodeURIComponent(query)}`
        );
        const content = response.data.data;

        // Send the response without time info
        return api.sendMessage(
          `${content}`,  // Removed the time part
          event.threadID,
          event.messageID
        );
      } catch (error) {
        console.error(`Failed to get an answer: ${error.message}`);
        return api.sendMessage(
          "An error occurred while processing your request.",
          event.threadID,
          event.messageID
        );
      }
    }
  },
};
