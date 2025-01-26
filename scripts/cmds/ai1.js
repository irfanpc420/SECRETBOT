const axios = require("axios");
const m = require("moment-timezone");

module.exports = {
  config: {
    name: "ai1", // Updated name
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 5,
    role: 0,
    shortDescription: "Mahi AI Response",
    category: "chat",
    guide: {
      en: "{p}{n} mahi [message]",
    },
  },

  onStart: async function () {},

  onChat: async function ({ api, args, event }) {
    const body = event.body.trim().toLowerCase();
    const Time = m.tz("Asia/Dhaka");
    const time = Time.format("MMMM D, YYYY h:mm A");

    // Check if the message starts with "mahi"
    if (body.startsWith("mahi")) {
      const query = body.slice(5).trim(); // Remove "mahi" from the message to get the query
      if (!query) {
        return api.sendMessage(
          `You mentioned "mahi" but didn't provide any context. Please ask a proper question.`,
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

        // Send the response
        return api.sendMessage(
          `Response:\n${content}\nTime: ${time} ✅`,
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
