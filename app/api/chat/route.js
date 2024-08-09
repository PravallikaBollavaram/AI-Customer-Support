import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { content } = await request.json();
        const body = JSON.stringify({
            model: "openai/gpt-4",
            messages: [
                { role: "user", content: content }
            ],
            max_tokens: 52
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
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error();
    }
}

// Handle GET requests (if needed)
export async function GET() {
    return NextResponse.json({ message: "GET method not supported on this route." }, { status: 405 });
}
