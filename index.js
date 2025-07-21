require("dotenv").config();
const express = require("express");
const { Telegraf } = require("telegraf");
const axios = require("axios");

const app = express();
app.use(express.json()); // Enable JSON parsing

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Start Command
bot.start((ctx) => ctx.reply("Hello! Send a message, and I'll generate a WhatsApp link for you!"));

// Handle Text Messages
bot.on("text", (ctx) => {
    try {
        const chatId = ctx.chat.id;
        const userMessage = ctx.message.text;
        
        // Get WhatsApp number from .env
        const whatsappNumber = process.env.WHATSAPP_NUMBER || "254114070477";
        
        // Generate a WhatsApp link with the user's message
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(userMessage)}`;
        
        ctx.reply(`Click here to continue on WhatsApp: ${whatsappLink}`);
    } catch (error) {
        console.error("Error processing message:", error);
        ctx.reply("Sorry, an error occurred while generating the WhatsApp link.");
    }
});

// Error Handling
bot.catch((err) => {
    console.error("Telegram Bot Error:", err);
});

// Launch the Telegram Bot
bot.launch().then(() => {
    console.log("Telegram bot started successfully!");
}).catch(err => {
    console.error("Failed to start Telegram bot:", err);
});

// Start Express Server (for Webhooks if needed)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));

// Graceful Shutdown
process.once("SIGINT", () => {
    bot.stop("SIGINT");
    console.log("Bot stopped due to SIGINT");
});
process.once("SIGTERM", () => {
    bot.stop("SIGTERM");
    console.log("Bot stopped due to SIGTERM");
});

