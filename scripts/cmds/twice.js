const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "twice",
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
      message.reply("Please provide a TWICE member's name. Example: twice nayeon info");
      return;
    }

    // TWICE মেম্বারদের তথ্য
    const membersInfo = {
      "nayeon": {
        name: "Im Nayeon",
        age: "29",
        position: "Lead Vocalist, Lead Dancer",
        birthday: "September 22, 1995",
        instagram: "https://www.instagram.com/nayeonyny",
        fact: "She is the oldest member of TWICE and known for her bright personality.",
        nationality: "South Korean",
        bloodType: "A",
        height: "163 cm",
        weight: "47 kg",
        zodiacSign: "Virgo",
        education: "Graduated from Konkuk University"
      },
      "jeongyeon": {
        name: "Yoo Jeongyeon",
        age: "28",
        position: "Lead Vocalist",
        birthday: "November 1, 1996",
        instagram: "https://www.instagram.com/jeongyeon",
        fact: "She is known for her short hair and tomboyish image.",
        nationality: "South Korean",
        bloodType: "O",
        height: "169 cm",
        weight: "49 kg",
        zodiacSign: "Scorpio",
        education: "Graduated from Apgujeong High School"
      },
      "momo": {
        name: "Hirai Momo",
        age: "28",
        position: "Main Dancer, Sub Vocalist, Sub Rapper",
        birthday: "November 9, 1996",
        instagram: "https://www.instagram.com/momo",
        fact: "She is known for her incredible dancing skills.",
        nationality: "Japanese",
        bloodType: "A",
        height: "167 cm",
        weight: "48 kg",
        zodiacSign: "Scorpio",
        education: "Graduated from Hanlim Multi Art School"
      },
      "sana": {
        name: "Minatozaki Sana",
        age: "27",
        position: "Sub Vocalist",
        birthday: "December 29, 1996",
        instagram: "https://www.instagram.com/sana",
        fact: "She is loved for her cute and bubbly personality.",
        nationality: "Japanese",
        bloodType: "B",
        height: "165 cm",
        weight: "46 kg",
        zodiacSign: "Capricorn",
        education: "Graduated from Shibuya Junior High School"
      },
      "jihyo": {
        name: "Park Jihyo",
        age: "28",
        position: "Leader, Main Vocalist",
        birthday: "February 1, 1997",
        instagram: "https://www.instagram.com/jihyo",
        fact: "She trained for 10 years before debuting with TWICE.",
        nationality: "South Korean",
        bloodType: "O",
        height: "162 cm",
        weight: "49 kg",
        zodiacSign: "Aquarius",
        education: "Graduated from Cheongdam High School"
      },
      "mina": {
        name: "Myoui Mina",
        age: "27",
        position: "Main Dancer, Sub Vocalist",
        birthday: "March 24, 1997",
        instagram: "https://www.instagram.com/mina",
        fact: "She was born in Texas, USA, but grew up in Japan.",
        nationality: "Japanese",
        bloodType: "A",
        height: "163 cm",
        weight: "46 kg",
        zodiacSign: "Aries",
        education: "Graduated from Obayashi Sacred Heart School"
      },
      "dahyun": {
        name: "Kim Dahyun",
        age: "26",
        position: "Lead Rapper, Sub Vocalist",
        birthday: "May 28, 1998",
        instagram: "https://www.instagram.com/dahyun",
        fact: "She is known for her quirky and fun personality.",
        nationality: "South Korean",
        bloodType: "O",
        height: "165 cm",
        weight: "48 kg",
        zodiacSign: "Gemini",
        education: "Graduated from Hanlim Multi Art School"
      },
      "chaeyoung": {
        name: "Son Chaeyoung",
        age: "26",
        position: "Main Rapper, Sub Vocalist",
        birthday: "April 23, 1999",
        instagram: "https://www.instagram.com/chaeyoung",
        fact: "She loves to draw and is TWICE's resident artist.",
        nationality: "South Korean",
        bloodType: "B",
        height: "159 cm",
        weight: "47 kg",
        zodiacSign: "Taurus",
        education: "Graduated from Hanlim Multi Art School"
      },
      "tzuyu": {
        name: "Chou Tzuyu",
        age: "25",
        position: "Lead Dancer, Sub Vocalist, Visual",
        birthday: "June 14, 1999",
        instagram: "https://www.instagram.com/tzuyu",
        fact: "She is the youngest member and is from Taiwan.",
        nationality: "Taiwanese",
        bloodType: "A",
        height: "170 cm",
        weight: "50 kg",
        zodiacSign: "Gemini",
        education: "Graduated from Hanlim Multi Art School"
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
    if (event.body && event.body.toLowerCase().startsWith("twice ")) {
      this.onStart({ message, event });
    }
  }
};
