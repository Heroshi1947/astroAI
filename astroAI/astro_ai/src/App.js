import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown to render markdown content

function App() {
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [interpretation, setInterpretation] = useState("");

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Sending POST request to the backend (Groq API)
      const response = await axios.post(
         `${process.env.REACT_APP_API_BASE_URL}/api/get-interpretation`,
        {
          dob,
          time,
          place,
        }
      );

      // Handle successful response and display the interpretation
      setInterpretation(response.data.interpretation);
    } catch (error) {
      console.error("Error fetching interpretation:", error);
      setInterpretation("Error generating astrology interpretation.");
    }
  };

  return (
    <div className="App">
      <h1>Vedic Astrology Interpretation</h1>
      <form onSubmit={handleSubmit}>
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <br />

        <label>Time of Birth:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <br />

        <label>Place of Birth:</label>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="City, Country"
          required
        />
        <br />

        <button type="submit">Get Interpretation</button>
      </form>

      <div className="Interpretation">
        <h2>Interpretation:</h2>
        {/* Use ReactMarkdown to render the markdown interpretation */}
        <ReactMarkdown>{interpretation}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;
