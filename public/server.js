require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
});

app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
