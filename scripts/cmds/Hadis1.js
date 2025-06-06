module.exports = {
  config: {
    name: "hadis1",
    version: "1.1",
    author: "Irfan Ahmed",
    countDown: 20,
    role: 0,
    category: "knowledge",
    guide: { 
      en: "Use this command to get one random hadith in Bangla from 3 books."
    }
  },
  onStart: async function ({ message }) {
    // ৩টি হাদিসের বইয়ের তথ্য
    const hadithBooks = [
      {
        name: "সহীহ বুখারি",
        link: "https://sunnah.com/bukhari",
        hadiths: [
          { 
            text: "কর্মের ফলাফল নিয়ত দ্বারা নির্ধারিত হয়।", 
            source: "সহীহ বুখারি - পৃষ্ঠা ১", 
            arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ" 
          },
          { 
            text: "তোমাদের মধ্যে উত্তম হলো তারা যারা কুরআন শেখে এবং অন্যকে শেখায়।", 
            source: "সহীহ বুখারি - পৃষ্ঠা ২৫", 
            arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ" 
          },
          { 
            text: "মুসলিম হলো সেই ব্যক্তি যার মুখ ও হাত দ্বারা অন্য মুসলমান নিরাপদ থাকে।", 
            source: "সহীহ বুখারি - পৃষ্ঠা ৪৩", 
            arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ" 
          },
          { 
            text: "জান্নাত মায়ের পায়ের নিচে।", 
            source: "সহীহ বুখারি - পৃষ্ঠা ৭৮", 
            arabic: "الْجَنَّةُ تَحْتَ أَقْدَامِ الْأُمَّهَاتِ" 
          },
          { 
            text: "সত্য কথা বলুন, তা আপনাকে সঠিক পথে নিয়ে যাবে।", 
            source: "সহীহ বুখারি - পৃষ্ঠা ১০০", 
            arabic: "قُولُوا الصِّدْقَ فَإِنَّهُ يَهْدِي إِلَى الْبِرِّ" 
          }
        ]
      },
      {
        name: "সহীহ মুসলিম",
        link: "https://sunnah.com/muslim",
        hadiths: [
          { 
            text: "তোমাদের কেউ প্রকৃত ঈমানদার হতে পারবে না যতক্ষণ না সে তার ভাইয়ের জন্যও সে জিনিস চায় যা সে নিজের জন্য চায়।", 
            source: "সহীহ মুসলিম - পৃষ্ঠা ১২", 
            arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ" 
          },
          { 
            text: "বিশ্বাসীদের মধ্যে সবচেয়ে পূর্ণ ঈমান হলো যার চরিত্র সবচেয়ে উত্তম।", 
            source: "সহীহ মুসলিম - পৃষ্ঠা ৮৯", 
            arabic: "أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا" 
          },
          { 
            text: "যে ব্যক্তি মানুষের প্রতি দয়া করে, আল্লাহ তার প্রতি দয়া করেন।", 
            source: "সহীহ মুসলিম - পৃষ্ঠা ৫০", 
            arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ اللَّهُ" 
          },
          { 
            text: "নম্রতা ঈমানের একটি অংশ।", 
            source: "সহীহ মুসলিম - পৃষ্ঠা ৪৫", 
            arabic: "الْحَيَاءُ مِنَ الإِيمَانِ" 
          },
          { 
            text: "আল্লাহ তওবা গ্রহণ করেন তার বান্দার জন্য যতক্ষণ না তার মৃত্যু শুরু হয়।", 
            source: "সহীহ মুসলিম - পৃষ্ঠা ১৩৪", 
            arabic: "إِنَّ اللَّهَ يَقْبَلُ تَوْبَةَ الْعَبْدِ مَا لَمْ يُغَرْغِرْ" 
          }
        ]
      },
      {
        name: "সুনান আবু দাউদ",
        link: "https://sunnah.com/abudawood",
        hadiths: [
          { 
            text: "পবিত্রতা হলো ঈমানের অর্ধেক।", 
            source: "সুনান আবু দাউদ - পৃষ্ঠা ৮", 
            arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ" 
          },
          { 
            text: "আল্লাহর কাছে সবচেয়ে প্রিয় হলো উত্তম চরিত্রের অধিকারী।", 
            source: "সুনান আবু দাউদ - পৃষ্ঠা ৩৯", 
            arabic: "إِنَّ أَحَبَّكُمْ إِلَى اللَّهِ أَحْسَنُكُمْ أَخْلَاقًا" 
          },
          { 
            text: "তোমরা মধু পান করো, কারণ এটি শিফার জন্য উপকারী।", 
            source: "সুনান আবু দাউদ - পৃষ্ঠা ৭২", 
            arabic: "اشْرَبُوا الْعَسَلَ فَإِنَّهُ شِفَاءٌ" 
          },
          { 
            text: "পড়ুন, কারণ আল্লাহ শিক্ষা এবং জ্ঞানকে ভালোবাসেন।", 
            source: "সুনান আবু দাউদ - পৃষ্ঠা ৫১", 
            arabic: "اقْرَأُوا فَإِنَّ اللَّهَ يُحِبُّ التَّعَلُّمَ" 
          }
        ]
      }
    ];

    // রেনডমভাবে একটি বই নির্বাচন
    const randomBook = hadithBooks[Math.floor(Math.random() * hadithBooks.length)];

    // রেনডমভাবে একটি হাদিস নির্বাচন
    const randomHadith = randomBook.hadiths[Math.floor(Math.random() * randomBook.hadiths.length)];

    // রেসপন্স তৈরি
    const response = `📚 *বইয়ের নাম:* ${randomBook.name}\n🔗 *লিংক:* ${randomBook.link}\n\n📖 *হাদিস:*\n"${randomHadith.text}"\n\n🕌 *আরবি:* ${randomHadith.arabic}\n📄 *সূত্র:* ${randomHadith.source}`;

    // বার্তা পাঠানো
    message.reply(response);
  }
};
