module.exports = {
  config: {
    name: "uptime",
    aliases: ["upt"],
    version: "4.0",
    author: "Irfan Ahmed",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Check bot uptime and system stats."
    },
    longDescription: {
      en: "Displays bot uptime, system stats like memory usage, CPU load, OS details, disk usage, and Node.js version."
    },
    category: "Utility",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {
    const os = require("os");
    const { execSync } = require("child_process");

    // Bot uptime
    const botUptimeInMilliseconds = process.uptime() * 1000;
    const botUptime = formatDuration(botUptimeInMilliseconds);

    // System uptime (since last reboot)
    const systemUptimeInMilliseconds = os.uptime() * 1000;
    const systemUptime = formatDuration(systemUptimeInMilliseconds);

    // Memory usage
    const usedMemory = (os.totalmem() - os.freemem()) / (1024 * 1024); // in MB
    const totalMemory = os.totalmem() / (1024 * 1024); // in MB
    const botMemoryUsage = process.memoryUsage().heapUsed / (1024 * 1024); // in MB

    // CPU load and details
    const cpuLoad = os.loadavg(); // [1min, 5min, 15min]
    const cpuCores = os.cpus().length; // Total cores
    const cpuSpeed = os.cpus()[0].speed; // Speed of one core (in MHz)

    // Disk usage (only for Linux/macOS systems)
    let diskUsage = "N/A";
    try {
      const diskInfo = execSync("df -h --total | grep total").toString();
      const diskDetails = diskInfo.trim().split(/\s+/);
      diskUsage = `Used: ${diskDetails[2]}, Free: ${diskDetails[3]}, Total: ${diskDetails[1]}`;
    } catch (err) {
      diskUsage = "Disk info unavailable.";
    }

    // Operating system and architecture
    const osType = os.type(); // e.g., Linux, Windows_NT
    const osPlatform = os.platform(); // e.g., linux, win32
    const osArch = os.arch(); // e.g., x64, arm

    // Node.js version
    const nodeVersion = process.version;

    // Last Restart Time
    const restartTime = new Date(Date.now() - botUptimeInMilliseconds).toLocaleString();

    // Final message
    const message = `
🤖 **Bot Uptime Stats:**
⏱ **Bot Uptime:** ${botUptime}
💻 **System Uptime:** ${systemUptime}
📊 **Memory Usage:**
   - Total: ${totalMemory.toFixed(2)} MB
   - Used: ${usedMemory.toFixed(2)} MB
   - Bot: ${botMemoryUsage.toFixed(2)} MB
🖥 **CPU Stats:**
   - Cores: ${cpuCores}
   - Avg Speed: ${cpuSpeed} MHz
   - Load: 1m: ${cpuLoad[0].toFixed(2)} | 5m: ${cpuLoad[1].toFixed(2)} | 15m: ${cpuLoad[2].toFixed(2)}
💾 **Disk Usage:** ${diskUsage}
🛠 **OS:** ${osType} (${osPlatform}, ${osArch})
🔧 **Node.js Version:** ${nodeVersion}
🔄 **Last Restart:** ${restartTime}
    `.trim();

    return api.sendMessage(message, event.threadID, event.messageID);
  }
};

function formatDuration(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 7);
  const weeks = Math.floor(ms / (1000 * 60 * 60 * 24 * 7));

  let duration = "";
  if (weeks > 0) duration += `${weeks}w `;
  if (days > 0) duration += `${days}d `;
  if (hours > 0) duration += `${hours}h `;
  if (minutes > 0) duration += `${minutes}m `;
  if (seconds > 0) duration += `${seconds}s`;

  return duration.trim();
}
