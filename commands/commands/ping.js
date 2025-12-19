async function ping(sock, from) {
  await sock.sendMessage(from, { text: "🏓 Pong! NYXEN Online ✅" });
}

module.exports = { ping };
