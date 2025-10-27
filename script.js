// script.js: ChatGPT integration using fetch to OpenAI API
document.getElementById('sendBtn').addEventListener('click', async () => {
    const apiKey = document.getElementById('apiKey').value.trim();
    const question = document.getElementById('userInput').value.trim();
    const responseDiv = document.getElementById('response');
    if (!apiKey) {
        responseDiv.textContent = 'Please enter your own OpenAI API key.';
        return;
    }
    if (!question) {
        responseDiv.textContent = 'Please enter a question.';
        return;
    }

    responseDiv.textContent = 'Thinking...';

    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: question}],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        if (!res.ok) {
            throw new Error('API error');
        }

        const data = await res.json();
        const answer = data.choices && data.choices[0]?.message?.content;
        responseDiv.textContent = answer || 'No response.';
    } catch (error) {
        responseDiv.textContent = 'There was an error fetching the AI response.';
    }
});
