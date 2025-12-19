const { default: makeWASocket, useMultiFileAuthState } = require("@adiwajshing/baileys");
const qrcode = require("qrcode-terminal");

const config = require("./config.json");
const { getMenu } = require("./commands/menu");
const { ping } = require("./commands/ping");
const { welcome } = require("./commands/welcome");
const { antilink } = require("./commands/antilink");
const { tagAll } = require("./commands/tagall");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");
  const sock = makeWASocket({ auth: state });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (u) => {
    if (u.qr) qrcode.generate(u.qr, { small: true });
    if (u.connection === "open") console.log("✅ NYXEN BOT ONLINE");
  });

  sock.ev.on("group-participants.update", async (msg) => {
    await welcome(sock, msg);
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const from = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
    const isGroup = from.endsWith("@g.us");

    if (config.antilink && isGroup) await antilink(sock, msg);

    if (text === `${config.prefix}menu`)
      await sock.sendMessage(from, { text: getMenu() });

    if (text === `${config.prefix}ping`)
      await ping(sock, from);

    if (text === `${config.prefix}tagall` && isGroup) {
      const meta = await sock.groupMetadata(from);
      await tagAll(sock, from, meta.participants.map(p => p.id));
    }
  });
}

startBot();
