async function tagAll(sock, from, members) {
  let text = "🔔 TAG ALL\n\n";
  let mentions = [];

  members.forEach(u => {
    text += `@${u.split("@")[0]} `;
    mentions.push(u);
  });

  await sock.sendMessage(from, { text, mentions });
}

module.exports = { tagAll };
