import axios from 'axios';
import React, { useState } from 'react';

const ImageGenerator = ({ goalInput }) => {
    const [generatedImage, setGeneratedImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGenerateImage = async () => {
        if (!goalInput) {
            setErrorMessage('Please enter a goal');
            return;
        }
        setErrorMessage('');
        setIsLoading(true);
        const API_KEY = `${import.meta.env.DALL_API_KEY}`;
        const URL = '/api/generate-dalle-image'; // Endpoint on your backend

        try {
            const response = await axios.post(URL, {
                prompt: goalInput
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            });

            // Assuming the API returns the image URL in response.data.image_url
            setGeneratedImage(response.data.image_url);
        } catch (error) {
            console.error('Error generating image: ', error.message);
            setErrorMessage('Failed to generate image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* Your existing JSX for input, button, loading indicator, error message */}
            
            {generatedImage && (
                <div>
                    <p>Generated Image:</p>
                    <img src={generatedImage} alt={`Generated from: ${goalInput}`} />
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;
