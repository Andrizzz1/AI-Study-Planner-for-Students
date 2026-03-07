export default async function handler(req, res) {
    try {
        const apiKey = process.env.GROQ_API_KEY;

        // Debug: check if key exists
        if (!apiKey) {
            return res.status(500).json({ error: { message: "GROQ_API_KEY is not set in environment variables" } });
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",
                messages: [
                    { role: "user", content: req.body.message }
                ]
            })
        });

        const data = await response.json();

        // Debug: log what Groq returns
        console.log("Groq response:", JSON.stringify(data));

        res.status(200).json(data);

    } catch (error) {
        console.error("Handler error:", error);
        res.status(500).json({ error: { message: error.message } });
    }
}