async function welcome(sock, msg) {
  const group = msg.id;
  for (const user of msg.participants) {
    if (msg.action === "add") {
      await sock.sendMessage(group, {
        text: `👋 Welcome @${user.split("@")[0]}`,
        mentions: [user]
      });
    }
    if (msg.action === "remove") {
      await sock.sendMessage(group, {
        text: `😢 Goodbye @${user.split("@")[0]}`,
        mentions: [user]
      });
    }
  }
}

module.exports = { welcome };
