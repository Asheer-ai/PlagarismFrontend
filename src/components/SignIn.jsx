import React, { useState } from 'react';
import Section from './Section';
import Heading from './Heading';
import Button from './Button';

function GetStarted() {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [result, setResult] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const url = 'http://localhost:5000/check-plagiarism';

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    setResult(data.result);
                } else {
                    setResult('Error: Unable to check plagiarism.');
                }
            } catch (error) {
                console.error('Error:', error);
                setResult('Error: Unable to check plagiarism.');
            }
        } else {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setResult(data.result);
                } else {
                    setResult('Error: Unable to check plagiarism.');
                }
            } catch (error) {
                console.error('Error:', error);
                setResult('Error: Unable to check plagiarism.');
            }
        }
    };

    return (
        <Section id='pricing'>
            <div className="container">
                <Heading
                    title="Check For Plagiarism"
                    text="Paste your text or upload a file to check for plagiarism"
                />
                <div className="relative">
                    <div className="relative z-1 flex flex-col items-center justify-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
                        
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            style={{
                                margin: '20px 0',
                                padding: '10px',
                                backgroundColor: '#ffffff55',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff',
                                cursor: 'pointer',
                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                                transition: 'background-color 0.3s ease, transform 0.2s ease'
                            }} 
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />

                        <textarea
                            style={{
                                width: '80%',
                                minHeight: '500px',
                                margin: '20px 0',
                                padding: '15px',
                                backgroundColor: '#ffffff99',
                                color: '#333',
                                border: 'none',
                                borderRadius: '12px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                fontSize: '1.2rem',
                                transition: 'box-shadow 0.3s ease'
                            }}
                            value={text}
                            onChange={handleTextChange}
                        ></textarea>

                        <Button
                            className="hidden lg:flex justify-center items-center px-5 py-3" 
                            onClick={handleSubmit}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#2980b9';
                                e.target.style.transform = 'scale(1.1)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#3498db';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            Check for Plagiarism
                        </Button>

                        {result && (
                            <div style={{
                                marginTop: '30px',
                                padding: '20px',
                                backgroundColor: '#ffffffdd',
                                borderRadius: '12px',
                                width: '80%',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                color: '#333',
                                textAlign: 'left',
                                fontSize: '1.1rem',
                                transition: 'background-color 0.3s ease, box-shadow 0.2s ease'
                            }}>
                                <h2 style={{
                                    color: '#2c3e50',
                                    marginBottom: '10px'
                                }}>Plagiarism Check Result:</h2>
                                <p>{result}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default GetStarted;
