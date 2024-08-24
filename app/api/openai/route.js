import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

export async function POST(req) {    
    try {

        const userData = (await req.json()).userInput;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Only report names of 3 best professors given provided subject and university. In your response leave out #s and seperate names with a comma and space. " },
                    {
                        role: "user", content: userData},
                ],
            max_tokens: 200, 
            temperature: 0,
        });

        let gptMessage = response.choices[0].message.content.trim().split("\n");

        return new Response(JSON.stringify({ message: gptMessage }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error in fetching GPT Data on Professors:', error);
        return new Response(JSON.stringify({ message: 'Error in fetching GPT Data on Professors' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

}