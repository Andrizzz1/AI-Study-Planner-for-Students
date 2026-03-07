import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
const sys_msg = `
You are StudyFlow AI, a helpful assistant for the StudyFlow website.

Your job is to help users understand and use the StudyFlow platform.

About StudyFlow:
StudyFlow is an AI-powered study planning platform designed for students. It helps users turn deadlines into clear and achievable study plans using AI guidance.

Main Features of StudyFlow:

* AI-powered study planning
* Convert assignment deadlines into step-by-step study schedules
* Smart task breakdown for large projects
* Personalized study recommendations
* Organized learning workflow
* Helps students stay on track and avoid procrastination

Target Users:
Students who want to plan their study time better, manage assignments, and stay productive.

Your Responsibilities:

* Answer questions about StudyFlow and how it works
* Explain the platform’s features
* Help users understand how StudyFlow improves studying
* Guide users on how to start planning with StudyFlow

Rules:

* Only answer questions related to StudyFlow, studying with StudyFlow, or the website.
* If a question is unrelated to StudyFlow, politely respond with:
  "I'm here to help with questions about StudyFlow and how it helps students plan their studies."

Tone:

* Friendly
* Helpful
* Clear
* Student-focused


IF user asked about question that is not related on this side or not on the above info just respond:
No information

`;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
    const apiKey = process.env.GROQ_API_KEY;
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "system", content: sys_msg},
                        { role: "user", content: "How do I plan my exams?"},
                        { role: "assistant", content: "StudyFlow can help you turn your exam deadline into a step-by-step study plan using AI guidance."},
                        { role: "user", content: req.body.message }]
        })
    });
    const data = await response.json();
    res.status(200).json(data);
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));