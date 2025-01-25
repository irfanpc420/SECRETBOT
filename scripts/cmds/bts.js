const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "bts",
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
    const memberName = event.body.split(" ")[1]?.toLowerCase(); // সদস্যের নাম নেয়ার জন্য
    if (!memberName) {
      message.reply("Please provide a BTS member's name. Example: bts rm info");
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
        fact: "He is known for his exceptional leadership and songwriting skills.",
        nationality: "South Korean",
        bloodType: "A",
        height: "181 cm",
        weight: "67 kg",
        zodiacSign: "Virgo",
        education: "Graduated from Global Cyber University (Major in Broadcasting and Entertainment)"
      },
      "jin": {
        name: "Kim Seokjin (Jin)",
        age: "32",
        position: "Vocalist, Visual",
        birthday: "December 4, 1992",
        instagram: "https://www.instagram.com/jin",
        fact: "He is known as the 'Worldwide Handsome' for his stunning visuals.",
        nationality: "South Korean",
        bloodType: "O",
        height: "179 cm",
        weight: "63 kg",
        zodiacSign: "Sagittarius",
        education: "Graduated from Konkuk University (Major in Acting)"
      },
      "suga": {
        name: "Min Yoongi (Suga)",
        age: "31",
        position: "Lead Rapper",
        birthday: "March 9, 1993",
        instagram: "https://www.instagram.com/agustd",
        fact: "He is a skilled producer and composer, known for his stage name 'Agust D'.",
        nationality: "South Korean",
        bloodType: "O",
        height: "174 cm",
        weight: "59 kg",
        zodiacSign: "Pisces",
        education: "Graduated from Global Cyber University (Major in Broadcasting and Entertainment)"
      },
      "jhope": {
        name: "Jung Hoseok (J-Hope)",
        age: "30",
        position: "Main Dancer, Rapper",
        birthday: "February 18, 1994",
        instagram: "https://www.instagram.com/uarmyhope",
        fact: "He is known for his energetic performances and bright personality.",
        nationality: "South Korean",
        bloodType: "A",
        height: "177 cm",
        weight: "65 kg",
        zodiacSign: "Aquarius",
        education: "Graduated from Global Cyber University (Major in Broadcasting and Entertainment)"
      },
      "jimin": {
        name: "Park Jimin",
        age: "29",
        position: "Main Dancer, Lead Vocalist",
        birthday: "October 13, 1995",
        instagram: "https://www.instagram.com/j.m",
        fact: "He is known for his captivating stage presence and delicate vocals.",
        nationality: "South Korean",
        bloodType: "A",
        height: "174 cm",
        weight: "58 kg",
        zodiacSign: "Libra",
        education: "Graduated from Global Cyber University (Major in Broadcasting and Entertainment)"
      },
      "v": {
        name: "Kim Taehyung (V)",
        age: "29",
        position: "Vocalist, Visual",
        birthday: "December 30, 1995",
        instagram: "https://www.instagram.com/thv",
        fact: "He is known for his deep voice and charismatic stage presence.",
        nationality: "South Korean",
        bloodType: "AB",
        height: "178 cm",
        weight: "63 kg",
        zodiacSign: "Capricorn",
        education: "Graduated from Global Cyber University (Major in Broadcasting and Entertainment)"
      },
      "jungkook": {
        name: "Jeon Jungkook",
        age: "27",
        position: "Main Vocalist, Lead Dancer, Center",
        birthday: "September 1, 1997",
        instagram: "https://www.instagram.com/abcdefghi__lmnopqrstuvwxyz",
        fact: "He is the youngest member of BTS and known as the 'Golden Maknae'.",
        nationality: "South Korean",
        bloodType: "A",
        height: "178 cm",
        weight: "66 kg",
        zodiacSign: "Virgo",
        education: "Graduated from Global Cyber University (Major in Broadcasting and Entertainment)"
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
        .map(([key, info], index) => `${index + 1}. ${key.toUpperCase()} (${info.name})`)
        .join("\n");

      message.reply(
        `Sorry, no information found for the given name.\n\nYou can search for the following members:\n\n${memberList}`
      );
    }
  },
  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase().startsWith("bts ")) {
      this.onStart({ message, event });
    }
  }
};
