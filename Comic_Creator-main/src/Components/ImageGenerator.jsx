import React, { useState } from 'react';
import './ImageGenerator.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import { Add, Edit, Share, Download } from '@mui/icons-material';
import { jsPDF } from 'jspdf';

export const ImageGenerator = () => {
    const [images, setImages] = useState([]);
    const [mainImg, setMainImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [genre, setGenre] = useState('comic'); // Default genre
    const [wordLength, setWordLength] = useState(100); // Default word length
    const [manga, setManga] = useState([]);

    const generateComicScript = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://127.0.0.1:5000/generate_comic_script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input_text: prompt,
                    blogs_style: genre, // Pass selected genre
                    no_words: wordLength, // Pass selected word length
                }),
            });
            const data = await response.json();
            setManga((prev) => [...prev, data.comic_script]);
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            generateComicScript();
        }
    };

    const downloadAsPDF = () => {
        const doc = new jsPDF();
        let yOffset = 10;

        manga.forEach((script, index) => {
            const lines = script.split('\n');
            lines.forEach((line, i) => {
                doc.text(line, 10, yOffset + (i * 10));
            });
            yOffset += lines.length * 10;
        });

        doc.save('comic_script.pdf');
    };

    return (
        <div className="app">
            {/* NavBar */}
            <nav>
                <input type="checkbox" id="check" />
                <label htmlFor="check" className="checkbtn">
                    <HorizontalSplitIcon />
                </label>
                <label htmlFor="" className="logo">
                    Comic <span>Creator</span>
                </label>
                <ul>
                    <li>
                        <a href="##" className="active">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="##">About</a>
                    </li>
                    <li>
                        <a href="##">Contact</a>
                    </li>
                </ul>
            </nav>

            {/* Container */}
            <div className="container">
                <div className="leftPanel">
                    <textarea
                        onKeyDown={handleEnterKeyPress}
                        className="text_area"
                        onChange={(e) => setPrompt(e.target.value)}
                        type="text"
                        placeholder="Enter text for comic script"
                    />
                    <br />
                    <br></br>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="genre" style={{ marginRight: '10px' }}>Genre:</label>
                        <select
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                        >
                            <option value="horror">Horror</option>
                            <option value="action">Action</option>
                            <option value="fantasy">Fantasy</option>
                            {/* Add more genre options as needed */}
                        </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="wordLength" style={{ marginRight: '10px' }}>Word Length : </label>
                        <input
                            id="wordLength"
                            type="number"
                            value={wordLength}
                            onChange={(e) => setWordLength(parseInt(e.target.value))}
                            min="1"
                            style={{
                                padding: '5px',
                                height: '30px', // Adjust the height as needed
                                borderRadius: '10px', // Adjust the border radius for rounded corners
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>

                    <br></br>
                    <br></br>
                    <div className="buttons">
                        <button className="generate_btn" onClick={generateComicScript}>
                            Generate <CheckCircleIcon />
                        </button>
                    </div>
                    {isLoading ? (
                        <div className="isLoading">
                            <p>Generating Comic Script...</p>
                        </div>
                    ) : null}
                </div>
                <div className="rightPanel" style={{ flex: '1 1 200px', height: 'auto', backgroundColor: 'var(--secondary_color)', borderRadius: '5px', overflowY: 'auto', position: 'relative', padding: '20px', margin: '10px' }}>
                    <div className="strip">
                        <h2>Your Comic Script</h2>
                    </div>
                    <div className="strip_container" id="strip_container" style={{ marginTop: '20px', padding: '10px' }}>
                        {manga.length > 0 ? (
                            <div style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '10px' }}>
                                {manga.map((script, index) => (
                                    <div key={index}>
                                        {script.split('\n').map((line, i) => (
                                            <p key={i}>{line}</p>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="buttons" id="btn-panel" style={{ marginTop: '20px' }}>
                        <button
                            className="download_btn"
                            onClick={downloadAsPDF}
                            style={{ padding: '10px 20px', marginRight: '10px', border: 'none', backgroundColor: '#3a4d39', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Download <Download />
                        </button>
                        <button className="share_btn" style={{ padding: '10px 20px', marginRight: '10px', border: 'none', backgroundColor: '#3a4d39', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>
                            Share <Share />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;
