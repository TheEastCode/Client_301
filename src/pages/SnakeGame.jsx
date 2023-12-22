import React, { useState, useEffect, useRef } from 'react';
import GameBoard from './SnakeGame/GameBoard';
import GameControlsAndScore from './GameControlsAndScore';
import SoundManager from './SoundManager';
function SnakeGame() {
    // State variables
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 20, y: 20 });
    const [isGameActive, setIsGameActive] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [hasEatenFood, setHasEatenFood] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [hasSnakeTurned, setHasSnakeTurned] = useState(false);
    const canvasSize = 600; // Example size, adjust as needed
    const boxSize = 20; // Example size, adjust as needed
    const direction = useRef('right'); // Example initial direction
    const gameLoopIntervalRef = useRef(null);
    const getRandomFoodPosition = () => {
        const newFood = {
            x: Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize,
            y: Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize,
        };
        return newFood;
    };
    const handleGameOver = () => {
        setIsGameActive(false);
        setGameOver(true);
        if (currentScore > highScore) {
            setHighScore(currentScore);
        }
    };
    const startGame = () => {
        setGameStarted(true);
        setIsGameActive(true);
        setGameOver(false);
        setHasEatenFood(false);
        setHasSnakeTurned(false);
        const initialSnake = [{ x: 10, y: 10 }];
        const initialFood = getRandomFoodPosition();
        setSnake(initialSnake);
        setFood(initialFood);
        setCurrentScore(0);
        gameLoopIntervalRef.current = setInterval(() => {
            // Update the snake's head position based on the current direction
            const newHead = { ...snake[0] };
            switch (direction.current) {
                case 'up':
                    newHead.y -= boxSize;
                    break;
                case 'down':
                    newHead.y += boxSize;
                    break;
                case 'left':
                    newHead.x -= boxSize;
                    break;
                case 'right':
                    newHead.x += boxSize;
                    break;
                default:
                    break;
            }
            // Check for collisions with walls
            if (newHead.x < 0 || newHead.x >= canvasSize || newHead.y < 0 || newHead.y >= canvasSize) {
                handleGameOver();
                return;
            }
            // Check for collisions with itself
            if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                handleGameOver();
                return;
            }
            // Check for collisions with food
            if (newHead.x === food.x && newHead.y === food.y) {
                setHasEatenFood(true);
                setSnake(prev => [newHead, ...prev]);
                setFood(getRandomFoodPosition());
                setCurrentScore(prev => prev + 1);
            } else {
                setSnake(prev => [newHead, ...prev.slice(0, -1)]);
                setHasEatenFood(false);
            }
            setHasSnakeTurned(false);
        }, 100);
    };
    const pauseGame = () => {
        setIsGameActive(false);
        clearInterval(gameLoopIntervalRef.current);
    };
    const resetGame = () => {
        setIsGameActive(false);
        setCurrentScore(0);
        clearInterval(gameLoopIntervalRef.current);
    };
    // Cleanup interval on component unmount
    useEffect(() => {
        return () => {
            clearInterval(gameLoopIntervalRef.current);
        };
    }, []);
    return (
        <div>
            <SoundManager
                soundEnabled={soundEnabled}
                isGameOver={gameOver}
                hasEatenFood={hasEatenFood}
                isGameStarted={gameStarted}
                hasSnakeTurned={hasSnakeTurned}
            />
            <GameBoard snake={snake} food={food} />
            <GameControlsAndScore
                onStart={startGame}
                onPause={pauseGame}
                onReset={resetGame}
                currentScore={currentScore}
                highScore={highScore}
            />
        </div>
    );
}
export default SnakeGame