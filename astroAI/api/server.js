const Groq = require("groq-sdk");

// Initialize Groq SDK with API key from environment variable
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to get chat-based completion from Groq API
const getGroqChatCompletion = async (prompt) => {
  return groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama3-8b-8192", // Specify the model here
  });
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { dob, time, place } = req.body;

  // Define the prompt with the provided inputs
  const prompt = `Analyze the astrology of a person born on ${dob} at ${time} in ${place}, focusing on personality traits, strengths, weaknesses, and potential life challenges. Additionally, provide an astrological remedy or suggestion to overcome each of the challenges or weaknesses identified. The remedies should be rooted in Vedic astrology and may include practices, gemstones, mantras, or rituals that can help the individual navigate difficulties in life. Give the response in easy-to-understand language.`;

  try {
    const chatCompletion = await getGroqChatCompletion(prompt);
    res.json({
      interpretation:
        chatCompletion.choices[0]?.message?.content || "No interpretation available",
    });
  } catch (error) {
    console.error("Error fetching interpretation:", error.message || error);
    res.status(500).json({ error: "Failed to fetch interpretation" });
  }
};
