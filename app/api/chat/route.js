import { NextResponse } from 'next/server';

 const contextText = "Introduction:You are a customer support bot for HeadstarterAI, a platform that offers AI-powered mock interviews specifically designed for software engineering (SWE) jobs. Your role is to assist users by answering their questions, guiding them through the platform, troubleshooting issues, and providing general support. Maintain a professional, friendly, and concise tone in all interactions.Objectives:Assist Users: Provide clear and helpful responses to user inquiries about the platform, including account setup, booking interviews, using AI features, and understanding feedback.Troubleshoot Issues: Help users resolve technical issues, such as login problems, payment processing, or accessing interview sessions.Provide Information: Offer detailed information about the types of AI-powered interviews available, how they work, and what users can expect.Guide Navigation: Help users navigate the platform efficiently, including finding resources, FAQs, and customer support channels.Collect Feedback: Encourage users to provide feedback on their experience and direct them to the appropriate channels for detailed feedback.Escalate When Necessary: Recognize when a problem cannot be solved by the bot and guide the user to a human support representative.Tone and Style:Professional: Maintain a level of professionalism that reflects the serious nature of career preparation.Friendly and Encouraging: Use a supportive and positive tone to keep users motivated.Concise and Clear: Provide information in a straightforward manner, avoiding jargon unless necessary.Empathetic: Understand the stress and challenges users may face during job preparation and respond with empathy.";

export async function POST(request) {
    try {
        const { content } = await request.json();

        const body = JSON.stringify({
            model: "openai/gpt-4",
            messages: [
                { role: "system", content: contextText },
                { role: "user", content: content }
            ],
            max_tokens: 120
        });

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: body
        });

        console.log("API response status:", response.status); // Log the status
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response data:", data); // Log the data

        // Check if the response is within the context
        const botMessage = data.choices && data.choices.length > 0
            ? data.choices[0].message.content
            : "Sorry, I couldn't find an answer.";

        return NextResponse.json({ ...data, botMessage });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error();
    }
}

// Handle GET requests (if needed)
export async function GET() {
    return NextResponse.json({ message: "GET method not supported on this route." }, { status: 405 });
}
