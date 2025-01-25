const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
    config: {
        name: "info",
        version: "1.0",
        author: "NTKhang",
        countDown: 20,
        role: 0,
        shortDescription: { vi: "", en: "" },
        longDescription: { vi: "", en: "" },
        category: "owner",
        guide: { en: "" },
        envConfig: {}
    },

    onStart: async function ({ message }) {
        // Author and Bot Information
        const authorName = " ⩸𝙸𝚛𝚏𝚊𝚗 𝙰𝚑𝚖𝚎𝚍⩸ ";
        const ownAge = "『 ⩸__21+__⩸ 』";
        const messenger = "https://m.me/xxxx";
        const authorFB = "https://www.facebook.com/psychopath.irfan.io";
        const authorNumber = "_+6585062351";
        const Status = "⩸__🆂🅸🅽🅶🅻🅴__⩸";
        const TG = "https://t.me/irfan420x";
        const insta = "https://www.instagram.com/toxic_4_2_0?igsh=MWNweXg0OGJuMDJxYw==";
        
        const urls = [
            "https://i.postimg.cc/J7c2d0KG/images-8.jpg",
            "https://i.postimg.cc/J7c2d0KG/images-8.jpg",
            "https://i.postimg.cc/J7c2d0KG/images-8.jpg",
            "https://i.postimg.cc/J7c2d0KG/images-8.jpg"
        ];
        const link = urls[Math.floor(Math.random() * urls.length)];

        // Date and Time
        const now = moment().tz('Asia/Dhaka');
        const date = now.format('MMMM Do YYYY');
        const time = now.format('h:mm:ss A');

        // Bot Uptime
        const uptime = process.uptime();
        const seconds = Math.floor(uptime % 60);
        const minutes = Math.floor((uptime / 60) % 60);
        const hours = Math.floor((uptime / (60 * 60)) % 24);
        const days = Math.floor(uptime / (60 * 60 * 24));
        const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

        // Message body with formatted information
        message.reply({
            body: `💫《 ⩸__𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧__⩸ 》💫\n
\💙 **OWNER NAME**: ${authorName}
\💥 **Telegram**: ${TG}
\✅ **Instagram**: ${insta}
\📝 **AGE**  : ${ownAge}
\💕 **RELATIONSHIP STATUS**: ${Status}
\🌐 **WhatsApp** : ${authorNumber}
\🌍 **Facebook**: ${authorFB}
\🔰 **Any Help Contact** : ⩸__${messenger}__⩸\n

💫《 ⩸__𝐁𝐨𝐭 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧__⩸ 》💫\n
\🤖 **BOT NAME** : ⩸__${global.GoatBot.config.nickNameBot}__⩸
\👾 **BOT SYSTEM PREFIX**: ${global.GoatBot.config.prefix}
\🗓 **DATE**: ${date}
\⏰ **CURRENT TIME**: ${time}
\📛 **BOT UPTIME**: ${uptimeString}

\===============`,
            attachment: await global.utils.getStreamFromURL(link)
        });
    },

    onChat: async function ({ event, message, getLang }) {
        if (event.body && event.body.toLowerCase() === "info") {
            this.onStart({ message });
        }
    }
};
