import React, { useEffect } from 'react';

function SoundManager({ soundEnabled, isGameOver, hasEatenFood, isGameStarted, hasSnakeTurned }) {
    // Audio elements
    const gameOverSound = new Audio('audio/game-over.mp3');
    const gameStartSound = new Audio('audio/game-start.mp3');
    const snakeTurnSound = new Audio('audio/snake-turn.mp3');
    const snakeEatAppleSound = new Audio('audio/snake-eat-apple.mp3');
    // Set volume for sounds
    gameStartSound.volume = 0.35;
    // ... Set volume for other sounds as needed
    // Function to handle audio playback
    const playSound = (audio) => {
        if (soundEnabled) {
            audio.play();
        }
    };
    // Handle game over sound
    useEffect(() => {
        if (soundEnabled && isGameOver) {
            playSound(gameOverSound);
        }
    }, [soundEnabled, isGameOver]);
    // Handle snake eating food sound
    useEffect(() => {
        if (soundEnabled && hasEatenFood) {
            playSound(snakeEatAppleSound);
        }
    }, [soundEnabled, hasEatenFood]);
    // Handle game start sound
    useEffect(() => {
        if (soundEnabled && isGameStarted) {
            playSound(gameStartSound);
        }
    }, [soundEnabled, isGameStarted]);
    // Handle snake turn sound
    useEffect(() => {
        if (soundEnabled && hasSnakeTurned) {
            playSound(snakeTurnSound);
        }
    }, [soundEnabled, hasSnakeTurned]);
    // Error handling for sound files
    useEffect(() => {
        const handleError = (e) => {
            console.error("Error loading sound file: ", e);
            // Additional error handling logic here
        };
        gameOverSound.addEventListener('error', handleError);
        gameStartSound.addEventListener('error', handleError);
        snakeTurnSound.addEventListener('error', handleError);
        snakeEatAppleSound.addEventListener('error', handleError);
        return () => {
            gameOverSound.removeEventListener('error', handleError);
            gameStartSound.removeEventListener('error', handleError);
            snakeTurnSound.removeEventListener('error', handleError);
            snakeEatAppleSound.removeEventListener('error', handleError);
        };
    }, []);
    return null;
}
export default SoundManager;