import { useState } from 'react';
import { withAuth0 } from '@auth0/auth0-react'
import fetchData from '../utils/fetchData';
import axios from 'axios';

const ImageGenerator = ({ auth0 }) => {
    const [inputWord, setInputWord] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setInputWord(e.target.value);
    };

    const handleGenerateImage = async () => {
        // const API_KEY = `${import.meta.env.DALL_API_KEY}`
        const URL = `${import.meta.env.VITE_SERVER_URL}/api/dalle/generate-dalle-image`;
        // const URL = 'https://api.openai.com/dalle/generate-dalle-image'
        // const URL = 'https://api.openai.com/v1/davinci/images'

        if (!auth0.isAuthenticated) {
            console.log('User is not authenticated.')
            return
        }

        const claim = await auth0.getIdTokenClaims()
        if (!claim) {
            console.log('Token claim is undefined.')
            return
        }
        const token = claim.__raw

        setIsLoading(true);

        try {
            const response = await axios.post(`${URL}`,
                {
                    prompt: inputWord
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            const imageData = response.data;
            setGeneratedImage(imageData.url);
        } catch (error) {
            console.error('error generating image: ', error.message);
            // Optionally, handle user notification here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <input type="text" value={inputWord} onChange={handleInputChange} />
            <button onClick={handleGenerateImage} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Image'}
            </button>

            {generatedImage && (
                <div>
                    <p>Generated Image:</p>
                    {/* <img src={generatedImage} alt={`Generated from: ${inputWord}`} /> */}
                    <p> {generatedImage} -- Generated from {inputWord} </p>
                </div>
            )}
        </div>
    );
}

export default ImageGenerator