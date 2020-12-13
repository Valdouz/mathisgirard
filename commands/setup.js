const fs = require("fs");
const mongo = require("../mongo");
const schemareports = require("../schemas/reports-channel-schema");
exports.run = async (client, message, args) => {
  // check if dm
  if (message.channel.type == "dm")
    return message.channel
      .send("**⚠️ Cette commande ne peut pas s'effectuer en DM ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });

  // Check Args
  if (!args[0])
    return message.channel
      .send("**⚠️ Vérifier votre commande `setup [type de setup]` ⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });

  // Setup Variable
  const type = args[0].toLowerCase();
  const chan = message.mentions.channels.first().id;

  // Check Permission
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel
      .send("**Tu n'as pas la permission de faire ça** *(MANAGE_GUILD)*⛔️ ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  // Check type
  if (type != "report")
    return message.channel
      .send("**⚠️ Configuration Incorrecte, config dispo: `report`⚠️** ")
      .then((msg) => {
        message.delete({ timeout: 300 });
        msg.delete({ timeout: 5000 });
      });
  // Check Channel
  if (chan == undefined)
    return message.channel.send("**⚠️ Salon Introuvable ⚠️** ").then((msg) => {
      message.delete({ timeout: 300 });
      msg.delete({ timeout: 5000 });
    });

  if (type == "report") {
    await mongo().then(async (mongoose) => {
      try {
        await schemareports.findOneAndUpdate(
          { _id: message.guild.id },
          { _id: message.guild.id, channelID: chan },
          { upsert: true }
        );
        return message.channel
          .send("**Setup fait avec succès ✅** ")
          .then((msg) => {
            message.delete({ timeout: 300 });
            msg.delete({ timeout: 5000 });
          });
      } catch (error) {
        return message.channel.send(`**ERROR : ${err}** `).then((msg) => {
          message.delete({ timeout: 300 });
          msg.delete({ timeout: 5000 });
        });
      } finally {
        mongoose.connection.close();
      }
    });
  }
};

module.exports.help = {
  name: "setup",
  description: "Configure le bot pour le serveur",
};