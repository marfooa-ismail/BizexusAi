
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Groq from "groq-sdk";
// import '../styles/PitchGenerator.css';

// const groq = new Groq({
//     apiKey: "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",
//     dangerouslyAllowBrowser: true,
// });

// const PitchGenerator = ({ chatHistory }) => {
//     const [generatedPitch, setGeneratedPitch] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const generatePitch = async () => {
//         // if (!chatHistory || chatHistory.length === 0) {
//         //     setError('No chat history available to generate a pitch.');
//         //     return;
//         // }

//         setLoading(true);
//         setError(null);

//         try {
//             const conversationSummary = chatHistory
//                 // .map(msg => `${msg.sender.toUpperCase()}: ${msg.text}`)
//                 // .join('\n\n');

//             const messages = [
//                 {
//                     role: "system",
//                     content: `You are a professional business pitch writer. Create a compelling business pitch based on the following conversation. 
//                              The pitch should include:
//                              1. Executive Summary
//                              2. Business Overview
//                              3. Market Analysis
//                              4. Financial Projections
//                              5. Risk Analysis
//                              6. Implementation Timeline
//                              Format the output in a clean, professional manner with clear sections and bullet points.`
//                 },
//                 {
//                     role: "user",
//                     content: `Generate a business pitch based on this conversation:\n\n${conversationSummary}`
//                 }
//             ];

//             const response = await groq.chat.completions.create({
//                 model: "llama-3.3-70b-versatile",
//                 messages: messages
//             });

//             const pitch = response.choices[0]?.message?.content;
            
//             if (pitch) {
//                 setGeneratedPitch(pitch);
//             } else {
//                 throw new Error('Failed to generate pitch');
//             }
//         } catch (error) {
//             console.error('Error generating pitch:', error);
//             setError('Failed to generate pitch. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDownload = () => {
//         try {
//             if (!generatedPitch) {
//                 setError('No pitch content available to download');
//                 return;
//             }

//             const formattedPitch = `BUSINESS PITCH
// Generated on: ${new Date().toLocaleDateString()}
// ===========================================

// ${generatedPitch}`;

//             const blob = new Blob([formattedPitch], { type: 'text/plain;charset=utf-8' });
//             const downloadLink = document.createElement('a');
//             downloadLink.href = URL.createObjectURL(blob);
//             downloadLink.download = `business-pitch-${new Date().toISOString().split('T')[0]}.txt`;

//             document.body.appendChild(downloadLink);
//             downloadLink.click();

//             setTimeout(() => {
//                 document.body.removeChild(downloadLink);
//                 URL.revokeObjectURL(downloadLink.href);
//             }, 100);
//         } catch (error) {
//             console.error('Error downloading pitch:', error);
//             setError('Failed to download the pitch. Please try again.');
//         }
//     };

//     return (
//         <div className="pitch-container">
//             <div className="pitch-header">
//                 <div className="header-content">
//                     <h1>Business Pitch Generator</h1>
//                     <p>Generate a pitch based on your chat</p>
//                 </div>
//                 <div className="header-buttons">
//                     <button 
//                         className="download-button"
//                         onClick={handleDownload}
//                         disabled={!generatedPitch}
//                     >
//                         Download Pitch
//                     </button>
//                     <button 
//                         className="back-button"
//                         onClick={() => navigate('/chat')}
//                     >
//                         Back to Chat
//                     </button>
//                 </div>
//             </div>

//             <div className="pitch-content">
//                 <button 
//                     className="generate-button"
//                     onClick={generatePitch}
//                     disabled={loading}
//                 >
//                     {loading ? 'Generating...' : 'Generate Pitch'}
//                 </button>

//                 {error && <div className="error-message">{error}</div>}

//                 {generatedPitch && (
//                     <div className="pitch-content-box">
//                         <pre>{generatedPitch}</pre>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PitchGenerator;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Groq from "groq-sdk";
import '../styles/PitchGenerator.css';

const groq = new Groq({
    apiKey: "your_api_key_here",
    dangerouslyAllowBrowser: true,
});

const PitchGenerator = () => {
    const [formData, setFormData] = useState({
        businessName: '',
        industry: '',
        targetAudience: '',
        marketSize: '',
        investment: '',
        pitchDuration: 'Short'
    });

    const [generatedPitch, setGeneratedPitch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Form fields handle karne ka function
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generatePitch = async () => {
        setLoading(true);
        setError(null);

        try {
            const messages = [
                {
                    role: "system",
                    content: `You are an expert business consultant. Generate a compelling business pitch using the following details:
                    - Business Name: ${formData.businessName}
                    - Industry: ${formData.industry}
                    - Target Audience: ${formData.targetAudience}
                    - Market Size: ${formData.marketSize}
                    - Investment: ${formData.investment}
                    - Pitch Duration: ${formData.pitchDuration}

                    Structure the pitch professionally with:
                    1. Executive Summary
                    2. Business Overview
                    3. Market Analysis
                    4. Financial Projections
                    5. Risk Analysis
                    6. Implementation Timeline
                    Format the output neatly.`
                }
            ];

            const response = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                messages: messages
            });

            const pitch = response.choices[0]?.message?.content;
            
            if (pitch) {
                setGeneratedPitch(pitch);
            } else {
                throw new Error('Failed to generate pitch');
            }
        } catch (error) {
            console.error('Error generating pitch:', error);
            setError('Failed to generate pitch. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!generatedPitch) {
            setError('No pitch content available to download');
            return;
        }

        const formattedPitch = `BUSINESS PITCH
Generated on: ${new Date().toLocaleDateString()}
===========================================

${generatedPitch}`;

        const blob = new Blob([formattedPitch], { type: 'text/plain;charset=utf-8' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `business-pitch-${new Date().toISOString().split('T')[0]}.txt`;

        document.body.appendChild(downloadLink);
        downloadLink.click();

        setTimeout(() => {
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(downloadLink.href);
        }, 100);
    };

    return (
        <div className="pitch-container">
            <div className="pitch-header">
                <h1>Business Pitch Generator</h1>
                <p>Enter your business details to generate a professional pitch</p>
            </div>

            <div className="form-container">
                <input type="text" name="businessName" placeholder="Business Name" value={formData.businessName} onChange={handleChange} required />
                <input type="text" name="industry" placeholder="Industry (e.g., Tech, Health)" value={formData.industry} onChange={handleChange} required />
                <input type="text" name="targetAudience" placeholder="Target Audience" value={formData.targetAudience} onChange={handleChange} required />
                <input type="text" name="marketSize" placeholder="Market Size (e.g., Local, Global)" value={formData.marketSize} onChange={handleChange} required />
                <input type="number" name="investment" placeholder="Investment Amount ($)" value={formData.investment} onChange={handleChange} required />
                
                <label>Pitch Duration:</label>
                <select name="pitchDuration" value={formData.pitchDuration} onChange={handleChange}>
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                </select>

                <button className="generate-button" onClick={generatePitch} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Pitch'}
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {generatedPitch && (
                <div className="pitch-content-box">
                    <pre>{generatedPitch}</pre>
                    <button className="download-button" onClick={handleDownload}>Download Pitch</button>
                </div>
            )}

            <button className="back-button" onClick={() => navigate('/chat')}>Back to Chat</button>
        </div>
    );
};

export default PitchGenerator;
