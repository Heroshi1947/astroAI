// backend/server.js
const express = require("express");
const Groq = require("groq-sdk"); // Import Groq SDK
const app = express();
const port = 5000; // Your backend server's port
const cors = require("cors");
app.use(cors()); // Allow all origins for local development

// Use environment variables for API keys
require("dotenv").config(); // To read environment variables from .env file

// Initialize Groq SDK with API key from environment variable
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middleware to parse incoming JSON data
app.use(express.json());

// Define the /api/get-interpretation endpoint
app.post("/api/get-interpretation", async (req, res) => {
  const { dob, time, place } = req.body;
  const prompt = `Analyze the astrology of a person born on ${dob} at ${time} in ${place}, focusing on personality traits, strengths, weaknesses, and potential life challenges. Additionally, provide an astrological remedy or suggestion to overcome each of the challenges or weaknesses identified. The remedies should be rooted in Vedic astrology and may include practices, gemstones, mantras, or rituals that can help the individual navigate difficulties in life. give response in a human manner like with easy english vocab`;

  try {
    const chatCompletion = await getGroqChatCompletion(prompt);
    console.log(chatCompletion); // Debug: Check the response from Groq
    res.json({
      interpretation:
        chatCompletion.choices[0]?.message?.content ||
        "No interpretation available",
    });
  } catch (error) {
    console.error("Error fetching interpretation:", error.message || error);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch interpretation" });
  }
});

// Function to get chat-based completion from Groq API
async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192", // Use the appropriate model
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
