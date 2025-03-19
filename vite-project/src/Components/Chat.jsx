


import React, { useState } from 'react';
import Groq from "groq-sdk";
import Navbar from './Navbar';
import 'leaflet/dist/leaflet.css';

const groq = new Groq({
    apiKey: "your_api_key_here",
    dangerouslyAllowBrowser: true,
});

const BusinessChat = () => {
    const [chat, setChat] = useState([]);
    const [userInput, setUserInput] = useState('');

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const userMessage = { sender: 'user', text: userInput.trim() };
        setChat(prev => [...prev, userMessage]);

        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are an AI business consultant providing expert advice on business strategies, marketing, finance, and entrepreneurship. Keep responses concise and insightful."
                    },
                    {
                        role: "user",
                        content: userInput
                    }
                ],
                model: "mixtral-8x7b-32768",
                temperature: 0.7,
                max_tokens: 150,
                top_p: 1,
            });

            const modelResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process your request.";
            setChat(prev => [...prev, { sender: 'model', text: modelResponse }]);
        } catch (error) {
            console.error('Error in chat completion:', error);
            setChat(prev => [...prev, { sender: 'model', text: "I encountered an error processing your request." }]);
        }

        setUserInput('');
    };

    return (
        <div className="chat-container">
            <Navbar />
            <div className="chat-header">
                <h1>Business Chatboard</h1>
                <p>Ask any business-related questions!</p>
            </div>

            <div className="chat-box">
                <div className="chat-messages">
                    {chat.map((message, index) => (
                        <div key={index} className={`message-wrapper ${message.sender}`}>
                            <div className="message-content">
                                {message.sender === 'model' && <div className="bot-avatar">📈</div>}
                                <div className={`message ${message.sender}`}>{message.text}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="input-container">
                    <input
                        type="text"
                        className="message-input"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask about business strategies, finance, or marketing..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button className="send-button" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default BusinessChat;
