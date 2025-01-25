const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
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
      message.reply("Please provide a BTS member's name. Example: bts jimin info");
      return;
    }

    // BTS মেম্বারদের তথ্য
    const membersInfo = {
      "rm": {
        name: "Kim Namjoon (RM)",
        age: "29",
        position: "Leader, Main Rapper",
        birthday: "September 12, 1994",
        instagram: "https://www.instagram.com/rkive",
        fact: "He is the leader and known for his IQ of 148.",
        nationality: "South Korean",
        bloodType: "A",
        height: "181 cm",
        weight: "82 kg",
        zodiacSign: "Virgo",
        education: "Graduated from the Global Cyber University"
      },
      "jin": {
        name: "Kim Seokjin (Jin)",
        age: "32",
        position: "Vocalist, Visual",
        birthday: "December 4, 1992",
        instagram: "https://www.instagram.com/jin",
        fact: "He is the oldest member of BTS and known as 'Worldwide Handsome'.",
        nationality: "South Korean",
        bloodType: "O",
        height: "179 cm",
        weight: "63 kg",
        zodiacSign: "Sagittarius",
        education: "Hanyang University (Theater and Film)"
      },
      "suga": {
        name: "Min Yoongi (Suga)",
        age: "31",
        position: "Lead Rapper",
        birthday: "March 9, 1993",
        instagram: "https://www.instagram.com/agustd",
        fact: "He is also a successful solo artist under the name 'Agust D'.",
        nationality: "South Korean",
        bloodType: "O",
        height: "174 cm",
        weight: "59 kg",
        zodiacSign: "Pisces",
        education: "Global Cyber University"
      },
      "jhope": {
        name: "Jung Hoseok (J-Hope)",
        age: "30",
        position: "Main Dancer, Rapper",
        birthday: "February 18, 1994",
        instagram: "https://www.instagram.com/uarmyhope",
        fact: "He is known for his amazing dance skills and sunny personality.",
        nationality: "South Korean",
        bloodType: "A",
        height: "177 cm",
        weight: "61 kg",
        zodiacSign: "Aquarius",
        education: "Hoseo University"
      },
      "jimin": {
        name: "Park Jimin",
        age: "29",
        position: "Main Dancer, Vocalist",
        birthday: "October 13, 1995",
        instagram: "https://www.instagram.com/j.m",
        fact: "He is known for his angelic voice and graceful dance moves.",
        nationality: "South Korean",
        bloodType: "AB",
        height: "175 cm",
        weight: "61 kg",
        zodiacSign: "Libra",
        education: "Busan High School of Arts"
      },
      "v": {
        name: "Kim Taehyung (V)",
        age: "29",
        position: "Vocalist",
        birthday: "December 30, 1995",
        instagram: "https://www.instagram.com/thv",
        fact: "He is known for his deep voice and unique fashion sense.",
        nationality: "South Korean",
        bloodType: "B",
        height: "178 cm",
        weight: "62 kg",
        zodiacSign: "Capricorn",
        education: "Global Cyber University"
      },
      "jungkook": {
        name: "Jeon Jungkook",
        age: "27",
        position: "Main Vocalist, Lead Dancer",
        birthday: "September 1, 1997",
        instagram: "https://www.instagram.com/abcdefghi__lmnopqrstuvwxyz",
        fact: "He is the youngest member and known as the 'Golden Maknae'.",
        nationality: "South Korean",
        bloodType: "A",
        height: "178 cm",
        weight: "66 kg",
        zodiacSign: "Virgo",
        education: "School of Performing Arts Seoul"
      }
    };

    // সদস্যের তথ্য চেক করা হচ্ছে
    if (membersInfo[memberName]) {
      const memberInfo = membersInfo[memberName];
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
      message.reply("Sorry, no information found for that member. Please try again with a valid BTS member name.");
    }
  },
  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase().startsWith("bts ")) {
      this.onStart({ message, event });
    }
  }
};
