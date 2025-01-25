module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt", "status"],
    version: "3.0",
    author: "xnil6x",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Check bot uptime with detailed system info."
    },
    longDescription: {
      en: "Displays detailed information about the bot's uptime, memory usage, and system specifications."
    },
    category: "Utility",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {
    const os = require("os");

    // Calculate uptime
    const uptimeInMilliseconds = process.uptime() * 1000;
    const uptime = formatDuration(uptimeInMilliseconds);

    // Current time
    const currentTime = new Date().toLocaleString();

    // Start time
    const startTime = new Date(Date.now() - uptimeInMilliseconds).toLocaleString();

    // Memory usage
    const memoryUsage = process.memoryUsage();
    const usedMemory = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
    const totalMemory = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);

    // System info
    const systemType = os.type(); // e.g., Linux, Darwin, Windows_NT
    const nodeVersion = process.version; // Node.js version
    const cpuArch = os.arch(); // CPU architecture (e.g., x64, arm)
    const totalUptimeInSeconds = Math.floor(process.uptime());

    // Response message
    const message = `
🤖 **Bot Status:**
⏱ **Uptime:** ${uptime}
🕒 **Start Time:** ${startTime}
🕒 **Current Time:** ${currentTime}
🔢 **Uptime in Seconds:** ${totalUptimeInSeconds}s

💾 **Memory Usage:**
   - Used: ${usedMemory} MB
   - Total: ${totalMemory} MB

🖥️ **System Info:**
   - System Type: ${systemType}
   - Node.js Version: ${nodeVersion}
   - CPU Architecture: ${cpuArch}
    `;

    // Send message
    return api.sendMessage(message.trim(), event.threadID, event.messageID);
  }
};

function formatDuration(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  let duration = "";
  if (days > 0) duration += `${days}d `;
  if (hours > 0) duration += `${hours}h `;
  if (minutes > 0) duration += `${minutes}m `;
  if (seconds > 0) duration += `${seconds}s`;

  return duration.trim();
}
