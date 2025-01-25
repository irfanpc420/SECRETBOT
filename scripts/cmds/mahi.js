const axios = require('axios');

module.exports = {
  config: {
    name: "mahi",
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 20,
    role: 0,
    shortDescription: { vi: "", en: "" },
    longDescription: { vi: "", en: "" },
    category: "owner",
    guide: { en: "" },
    envConfig: {}
  },

  onStart: async function ({ message, event }) {
    const query = event.body.split(" ").slice(1).join(" ");
    if (!query) {
      message.reply("Please provide a query to search. Example: .mahi <query>");
      return;
    }

    const apiKey = 'AIzaSyDMhQHMgBIc9EXGPdS0IBuQT33mMkC05p4';
    const searchEngineId = 'c4d160f28930a4314';
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${searchEngineId}`;

    try {
      const response = await axios.get(url);

      // Check if the API limit is exceeded
      if (response.data.error && response.data.error.code === 403) {
        message.reply("Sorry, the API limit has been reached. Please try again later.");
        return;
      }

      const items = response.data.items;
      if (!items || items.length === 0) {
        message.reply("Sorry, no results found.");
        return;
      }

      let resultMessage = `💫《 ⩸__𝐒𝐞𝐚𝐫𝐜𝐡 𝐑𝐞𝐬𝐮𝐥𝐭𝐬__⩸ 》💫\n`;

      // Only show the first result
      items.slice(0, 1).forEach((item, index) => {
        resultMessage += `\n🔍 **Result ${index + 1}:**\n`;
        resultMessage += `💙 **Title**: ${item.title}\n`;
        resultMessage += `📖 **Info**: ${item.snippet}\n`;
      });

      // Send the message only once
      if (!message.data?.isSent) {
        message.reply(resultMessage);
        message.data = { isSent: true }; // Mark message as sent
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error.code === 403) {
          message.reply("Sorry, the API limit has been reached. Please try again later.");
        } else {
          message.reply("Sorry, there was an error retrieving the search results. Please try again later.");
        }
      } else {
        message.reply("Sorry, there was an error. Please try again later.");
      }
    }
  },

  onChat: async function ({ event, message }) {
    // Ensure that the result is sent only once
    if (event.body && event.body.toLowerCase().startsWith(".mahi ") && !message.data?.isSent) {
      await this.onStart({ message, event });
    }
  }
};
