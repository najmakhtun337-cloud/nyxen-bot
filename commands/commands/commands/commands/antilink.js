async function antilink(sock, msg) {
  const text = msg.message.conversation || "";
  if (text.includes("chat.whatsapp.com")) {
    await sock.sendMessage(msg.key.remoteJid, { text: "❌ Group link not allowed!" });
  }
}

module.exports = { antilink };
