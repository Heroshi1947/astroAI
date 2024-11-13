const Groq = require("groq-sdk"); // Import Groq SDK
const cors = require("cors");

// Initialize Groq SDK with API key from environment variable
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Define the handler for the serverless function
export default async function handler(req, res) {
  // Use CORS only if necessary on Vercel
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const { dob, time, place } = req.body;
  const prompt = `Analyze the astrology of a person born on ${dob} at ${time} in ${place}...`; // Add prompt as needed

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192",
    });

    res.json({
      interpretation: chatCompletion.choices[0]?.message?.content || "No interpretation available",
    });
  } catch (error) {
    console.error("Error fetching interpretation:", error.message || error);
    res.status(500).json({ error: error.message || "Failed to fetch interpretation" });
  }
}
