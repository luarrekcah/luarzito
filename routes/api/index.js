const express = require("express"),
  router = express.Router();

const fs = require("fs");
const path = require("path");
const client = require("../../bot");

const commandsDir = path.join(__dirname, "../../commands");

router.get("/", (req, res) => {
  res.send("api/v1/anime/:format/:search");
});

router.get("/anime/:format/:search", async (req, res) => {
  const gif = await fetch(
    `https://kawaii.red/api/${req.params.format}/${req.params.search}/token=anonymous/`
  ).then((response) => {
    return response.json();
  });

  res.json(gif);
});

router.get("/commands", async (req, res) => {
  try {
    const discordClient = client;

    res.json(discordClient.commands);
  } catch (error) {
    console.error("Error reading commands:", error);
    res.status(500).json({ error: "Failed to load commands" });
  }
});

router.get("/guildsize", async (req, res) => {
	try {
	  const discordClient = client;
  
	  res.json(discordClient.guilds.cache.size);
	} catch (error) {
	  console.error("Error reading commands:", error);
	  res.status(500).json({ error: "Failed to load commands" });
	}
  });

module.exports = router;
