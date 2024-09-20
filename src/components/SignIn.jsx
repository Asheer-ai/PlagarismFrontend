import React, { useState } from 'react';
import Section from './Section';
import Heading from './Heading';
import Button from './Button';

function GetStarted() {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [result, setResult] = useState('');
    
    // States for file comparison
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [compareResult, setCompareResult] = useState('');

    const [loading, setLoading] = useState(false);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFile1Change = (e) => {
        setFile1(e.target.files[0]);
    };

    const handleFile2Change = (e) => {
        setFile2(e.target.files[0]);
    };

    const handleSubmitSingle = async () => {
        const url = 'http://localhost:5000/check-plagiarism';

        if (!text && !file) {
            setResult('Please provide text or upload a file.');
            return;
        }

        setLoading(true);
        setResult('');

        try {
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    setResult(data.result);
                } else {
                    const errorData = await response.json();
                    setResult(`Error: ${errorData.error || 'Unable to check plagiarism.'}`);
                }
            } else {
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
                    const errorData = await response.json();
                    setResult(`Error: ${errorData.error || 'Unable to check plagiarism.'}`);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setResult('Error: Unable to check plagiarism.');
        } finally {
            setLoading(false);
        }
    };

    const handleCompare = async () => {
        if (!file1 || !file2) {
            setCompareResult('Please upload both files to compare.');
            return;
        }

        const url = 'http://localhost:5000/compare-files';
        const formData = new FormData();
        formData.append('file1', file1);
        formData.append('file2', file2);

        setLoading(true);
        setCompareResult('');

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const { plagiarism_message, similarity_score } = data;
                setCompareResult(
                    `${plagiarism_message} Similarity score: ${similarity_score.toFixed(2)}`
                );
            } else {
                const errorData = await response.json();
                setCompareResult(`Error: ${errorData.error || 'Unable to compare files.'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            setCompareResult('Error: Unable to compare files.');
        } finally {
            setLoading(false);
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
                    <div className="relative z-1 flex flex-col items-center justify-center h-auto mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-auto">
                        
                        {/* Single Text/File Input */}
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            style={fileInputStyle}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />

                        <textarea
                            style={textareaStyle}
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Paste your text here..."
                        ></textarea>

                        <Button
                            disabled={loading}
                            className="hidden lg:flex justify-center items-center px-5 py-3" 
                            onClick={handleSubmitSingle}
                            style={buttonStyle}
                        >
                            {loading ? 'Checking...' : 'Check for Plagiarism'}
                        </Button>

                        {result && (
                            <div style={resultStyle}>
                                <h2 style={resultHeadingStyle}>Plagiarism Check Result:</h2>
                                <p>{result}</p>
                            </div>
                        )}

                        {/* Divider */}
                        <hr style={{ width: '80%', margin: '40px 0', borderColor: '#ccc' }} />

                        {/* Compare Two Files */}
                        <Heading
                            title="Compare Two Files"
                            text="Upload two files to check their similarity"
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <input 
                                type="file" 
                                onChange={handleFile1Change} 
                                style={fileInputStyle}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            />
                            <input 
                                type="file" 
                                onChange={handleFile2Change} 
                                style={fileInputStyle}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            />
                            <Button
                                disabled={loading}
                                className="hidden lg:flex justify-center items-center px-5 py-3 mt-4" 
                                onClick={handleCompare}
                                style={buttonStyle}
                            >
                                {loading ? 'Comparing...' : 'Compare Files'}
                            </Button>
                        </div>

                        {compareResult && (
                            <div style={resultStyle}>
                                <h2 style={resultHeadingStyle}>Comparison Result:</h2>
                                <p>{compareResult}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
}

// Inline styles (you can move these to a CSS/SCSS file for better management)
const fileInputStyle = {
    margin: '20px 0',
    padding: '10px',
    backgroundColor: '#ffffff55',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s ease, transform 0.2s ease'
};

const textareaStyle = {
    width: '80%',
    minHeight: '200px',
    margin: '20px 0',
    padding: '15px',
    backgroundColor: '#ffffff99',
    color: '#333',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    fontSize: '1.2rem',
    transition: 'box-shadow 0.3s ease'
};

const buttonStyle = {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
};

const resultStyle = {
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
};

const resultHeadingStyle = {
    color: '#2c3e50',
    marginBottom: '10px'
};

export default GetStarted;
