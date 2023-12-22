import React, { useRef, useEffect } from 'react';
function GameBoard({ snake, food, canvasWidth, canvasHeight }) {
    const canvasRef = useRef(null);
    // Function to draw the snake
    const drawSnake = (ctx) => {
        ctx.fillStyle = 'green';
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, 20, 20); // Adjust size as needed
        });
    };
    // Function to draw the food
    const drawFood = (ctx) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, 20, 20); // Adjust size as needed
    };
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the snake and food
        drawSnake(ctx);
        drawFood(ctx);
    }, [snake, food]);
    // Responsive canvas size
    const resizeCanvas = () => {
        const width = Math.min(window.innerWidth, canvasWidth);
        const height = Math.min(window.innerHeight, canvasHeight);
        return { width, height };
    };
    const { width, height } = resizeCanvas();
    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ border: '1px solid black' }}
        />
    );
}
export default GameBoard