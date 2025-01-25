const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
  );
  return base.data.xnil;
};

module.exports = {
  config: {
    name: "flux",
    version: "2.0",
    role: 0,
    author: "xnil",
    description: "Generate images with Flux.1 Pro",
    category: "ai image",
    preimum: true,
    guide: "{pn} [prompt]",
    countDown: 15,
  },

  onStart: async function({ message, event, args, getLang, api }) {
    try {
      const prompt = args.join(" ");
      const startTime = new Date().getTime();
      const ok = message.reply("wait baby <😘");
      api.setMessageReaction("⌛", event.messageID, (err) => {}, true);
      const apiUrl = `${await baseApiUrl()}/xnil/flux?prompt=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);
      const imageUrl = response.data.image;
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      message.unsend(ok.messageID);
      const attachment = await global.utils.getStreamFromURL(imageUrl);
      const endTime = new Date().getTime();
      await message.reply({
        body: `Here's your image\nModel Name: "Flux"\nTime Taken: ${(endTime - startTime) / 1000} second/s`,
        attachment,
      });
    } catch (e) {
      message.reply("Error: " + e.message);
    }
  },
};
