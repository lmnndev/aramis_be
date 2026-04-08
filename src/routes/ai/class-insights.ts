import express from "express";
import { Student, ClassDetails, OpenAIResponse } from "../../types";
const router = express.Router();

router.post("/class-insights", async (req, res) => {
  try {
    const { classDetails, students } = req.body as {
  classDetails: ClassDetails;
  students: Student[];
};

    const prompt = `
You are an educational assistant.

Explain the insights of this class in a simple and short way.

Class:
- Name: ${classDetails.name}
- Capacity: ${classDetails.capacity}
- Status: ${classDetails.status}
- Subject: ${classDetails.subject?.name}
- Department: ${classDetails.department?.name}

Students:
- Total shown: ${students.length}
- Names: ${students.map(s => s.name).join(", ")}

Instructions:
- Keep it short (2-3 sentences)
- Human readable
- Explain what the data means, not just repeat it
`;

    
    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
      }),
    });

    const data = (await aiResponse.json()) as OpenAIResponse;

    const text = data.output?.[0]?.content?.[0]?.text ?? "No insight.";

    res.json({ insight: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI insight failed" });
  }
});

export default router;