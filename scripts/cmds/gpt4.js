const axios = require("axios");

module.exports = {
  config: {
    name: "ayesha",
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 5,
    role: 0,
    shortDescription: "Ayesha AI Response",
    category: "chat",
    guide: {
      en: "{p}{n} [message]",
    },
  },

  onStart: async function () {},

  onChat: async function ({ api, args, event }) {
    const body = event.body.trim().toLowerCase();

    // Check if the message starts with "Ayesha"
    if (body.startsWith("ayesha")) {
      const query = body.slice(6).trim(); // "Ayesha" মুছে শুধু প্রশ্ন নাও

      if (!query) {
        return api.sendMessage(
          "**Please provide a valid question after 'Ayesha'.**",
          event.threadID,
          event.messageID
        );
      }

      try {
        // GPT-4o API কল
        const response = await axios.get(
          `https://kaiz-apis.gleeze.com/api/gpt-4o?ask=${encodeURIComponent(query)}&uid=1&webSearch=off`
        );
        const content = response.data.response || "❌ No response received from GPT-4o.";

        // সরাসরি উত্তর পাঠানো হবে
        return api.sendMessage(content, event.threadID, event.messageID);
      } catch (error) {
        console.error(`❌ GPT-4o API Error: ${error.message}`);
        return api.sendMessage(
          "**❌ An error occurred while fetching the GPT-4o response.**",
          event.threadID,
          event.messageID
        );
      }
    }
  },
};
