const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "bp",
    version: "1.0",
    author: "Irfan Ahmed", // সঠিক বানান
    countDown: 20,
    role: 0,
    shortDescription: { vi: "", en: "" },
    longDescription: { vi: "", en: "" },
    category: "owner",
    guide: { en: "" },
    envConfig: {}
  },
  onStart: async function ({ message, event }) {
    const memberName = event.body.split(" ")[1]?.toLowerCase(); // সদস্যের নাম নেয়ার জন্য
    if (!memberName) {
      message.reply("Please provide a Blackpink member's name. Example: bp lisa info");
      return;
    }

    // Blackpink মেম্বারদের তথ্য
    const membersInfo = {
      "jisoo": {
        name: "Kim Jisoo",
        age: "29",
        position: "Vocalist, Visual",
        birthday: "January 3, 1995",
        instagram: "https://www.instagram.com/sooyaaa__",
        fact: "She is known for her elegant visuals and powerful vocals.",
        nationality: "South Korean",
        bloodType: "O",
        height: "162 cm",
        weight: "50 kg",
        zodiacSign: "Capricorn",
        education: "Graduated from the Kyung Hee University"
      },
      "jennie": {
        name: "Kim Jennie",
        age: "28",
        position: "Main Rapper, Vocalist",
        birthday: "January 16, 1996",
        instagram: "https://www.instagram.com/jennierubyjane",
        fact: "She is known for her charismatic rap and fashion sense.",
        nationality: "South Korean",
        bloodType: "B",
        height: "163 cm",
        weight: "50 kg",
        zodiacSign: "Capricorn",
        education: "Auckland, New Zealand (studied there for some time)"
      },
      "rosé": {
        name: "Roseanne Park (Rosé)",
        age: "27",
        position: "Main Vocalist, Lead Dancer",
        birthday: "February 11, 1997",
        instagram: "https://www.instagram.com/roses_are_rosie",
        fact: "She is known for her unique, high-pitched voice and musical talents.",
        nationality: "New Zealand (Born in New Zealand, raised in South Korea)",
        bloodType: "B",
        height: "168 cm",
        weight: "47 kg",
        zodiacSign: "Aquarius",
        education: "Graduated from the Hanlim Multi Art School"
      },
      "lisa": {
        name: "Lalisa Manoban (Lisa)",
        age: "26",
        position: "Main Dancer, Lead Rapper, Sub Vocalist",
        birthday: "March 27, 1997",
        instagram: "https://www.instagram.com/lalalalisa_m",
        fact: "She is known for her exceptional dancing and rapping skills.",
        nationality: "Thai",
        bloodType: "O",
        height: "167 cm",
        weight: "46 kg",
        zodiacSign: "Aries",
        education: "Studied at the Pramoch Wittaya School in Thailand"
      }
    };

    // সদস্যের তথ্য চেক করা হচ্ছে
    const memberKey = Object.keys(membersInfo).find(
      key => key.toLowerCase() === memberName || membersInfo[key].name.toLowerCase().includes(memberName)
    );

    if (memberKey) {
      const memberInfo = membersInfo[memberKey];
      const now = moment().tz('Asia/Dhaka');
      const date = now.format('MMMM Do YYYY');
      const time = now.format('h:mm:ss A');

      message.reply({
        body: `💫《 ⩸__𝐌𝐞𝐦𝐛𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧__⩸ 》💫\n
\💙 NAME: ${memberInfo.name}
\📝 AGE: ${memberInfo.age}
\🎤 POSITION: ${memberInfo.position}
\🎂 BIRTHDAY: ${memberInfo.birthday}
\📸 INSTAGRAM: ${memberInfo.instagram}
\⭐ FACT: ${memberInfo.fact}
\🌍 NATIONALITY: ${memberInfo.nationality}
\🩸 BLOOD TYPE: ${memberInfo.bloodType}
\📏 HEIGHT: ${memberInfo.height}
\⚖️ WEIGHT: ${memberInfo.weight}
\♑ ZODIAC SIGN: ${memberInfo.zodiacSign}
\🎓 EDUCATION: ${memberInfo.education}\n

💫《 ⩸__𝐁𝐨𝐭 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧__⩸ 》💫\n
\🤖BOT NAME: ⩸__${global.GoatBot.config.nickNameBot}__⩸
\🗓 DATE: ${date}
\⏰ NOW TIME: ${time}

🔍 Information provided by: Irfan Ahmed`
      });
    } else {
      const memberList = Object.entries(membersInfo)
        .map(([key, info], index) => `${index + 1}. ${key.charAt(0).toUpperCase() + key.slice(1)} (${info.name})`)
        .join("\n");

      message.reply(
        `Sorry, no information found for the given name.\n\nYou can search for the following members:\n\n${memberList}`
      );
    }
  },
  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase().startsWith("bp ")) {
      this.onStart({ message, event });
    }
  }
};
