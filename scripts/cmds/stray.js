const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "stray",
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 20,
    role: 0,
    shortDescription: { en: "Stray Kids members info" },
    longDescription: { en: "Get detailed information about Stray Kids members" },
    category: "owner",
    guide: { en: "Use: stray (member name)" },
    envConfig: {},
  },
  onStart: async function ({ message, event }) {
    const memberName = event.body.split(" ")[1]?.toLowerCase(); // মেম্বারের নাম নেয়ার জন্য
    const membersInfo = {
      "bangchan": {
        name: "Bang Chan",
        age: "25",
        position: "Leader, Producer, Lead Vocalist, Lead Dancer",
        birthday: "October 3, 1997",
        fact: "He lived in Australia for most of his childhood.",
        nationality: "Australian-Korean",
        bloodType: "O",
        height: "171 cm",
        zodiacSign: "Libra",
      },
      "lee know": {
        name: "Lee Know",
        age: "25",
        position: "Main Dancer, Sub Vocalist, Sub Rapper",
        birthday: "October 25, 1998",
        fact: "He was a backup dancer for BTS.",
        nationality: "South Korean",
        bloodType: "O",
        height: "172 cm",
        zodiacSign: "Scorpio",
      },
      "changbin": {
        name: "Seo Changbin",
        age: "24",
        position: "Main Rapper, Producer, Sub Vocalist",
        birthday: "August 11, 1999",
        fact: "He is part of the producing team '3RACHA'.",
        nationality: "South Korean",
        bloodType: "O",
        height: "167 cm",
        zodiacSign: "Leo",
      },
      "hyunjin": {
        name: "Hwang Hyunjin",
        age: "23",
        position: "Main Dancer, Lead Rapper, Visual",
        birthday: "March 20, 2000",
        fact: "Known for his striking visuals and dancing skills.",
        nationality: "South Korean",
        bloodType: "B",
        height: "179 cm",
        zodiacSign: "Pisces",
      },
      "han": {
        name: "Han Jisung",
        age: "23",
        position: "Main Rapper, Lead Vocalist, Producer",
        birthday: "September 14, 2000",
        fact: "He lived in Malaysia for a few years.",
        nationality: "South Korean",
        bloodType: "B",
        height: "169 cm",
        zodiacSign: "Virgo",
      },
      "felix": {
        name: "Felix Lee",
        age: "23",
        position: "Lead Dancer, Lead Rapper",
        birthday: "September 15, 2000",
        fact: "Born in Sydney, Australia.",
        nationality: "Australian-Korean",
        bloodType: "AB",
        height: "171 cm",
        zodiacSign: "Virgo",
      },
      "seungmin": {
        name: "Kim Seungmin",
        age: "22",
        position: "Main Vocalist",
        birthday: "September 22, 2000",
        fact: "Known for his bright and cheerful personality.",
        nationality: "South Korean",
        bloodType: "A",
        height: "178 cm",
        zodiacSign: "Virgo",
      },
      "jeongin": {
        name: "Yang Jeongin",
        age: "21",
        position: "Sub Vocalist, Maknae",
        birthday: "February 8, 2001",
        fact: "He is the youngest member of Stray Kids.",
        nationality: "South Korean",
        bloodType: "A",
        height: "172 cm",
        zodiacSign: "Aquarius",
      },
    };

    if (!memberName) {
      // সব মেম্বারের নাম দেখাবে
      const memberList = Object.keys(membersInfo)
        .map((key, index) => `${index + 1}. ${membersInfo[key].name}`)
        .join("\n");
      message.reply(`Available Stray Kids members:\n\n${memberList}\n\nUse: stray (member name) for details.`);
      return;
    }

    // নির্দিষ্ট মেম্বারের তথ্য চেক
    const memberKey = Object.keys(membersInfo).find(
      (key) => key.toLowerCase() === memberName || membersInfo[key].name.toLowerCase().includes(memberName)
    );

    if (memberKey) {
      const memberInfo = membersInfo[memberKey];
      const now = moment().tz("Asia/Dhaka");
      const date = now.format("MMMM Do YYYY");
      const time = now.format("h:mm:ss A");

      message.reply({
        body: `🌟《 Member Information 》🌟\n
\💙 NAME: ${memberInfo.name}
\📝 AGE: ${memberInfo.age}
\🎤 POSITION: ${memberInfo.position}
\🎂 BIRTHDAY: ${memberInfo.birthday}
\⭐ FACT: ${memberInfo.fact}
\🌍 NATIONALITY: ${memberInfo.nationality}
\🩸 BLOOD TYPE: ${memberInfo.bloodType}
\📏 HEIGHT: ${memberInfo.height}
\♑ ZODIAC SIGN: ${memberInfo.zodiacSign}\n

📅 DATE: ${date}
⏰ TIME: ${time}`,
      });
    } else {
      message.reply("Sorry, no information found for the given name. Use: stray (member name).");
    }
  },
  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase().startsWith("stray")) {
      this.onStart({ message, event });
    }
  },
};
