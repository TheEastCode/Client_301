import React from 'react';
function ControlsAndScore({
    onStart, onPause, onReset,
    currentScore, highScore
}) {
    return (
        <div>
            {/* Score display */}
            <div className="score-board">
                <div>Current Score: {currentScore}</div>
                <div>High Score: {highScore}</div>
            </div>
            {/* Control panel buttons */}
            <div className="control-panel">
                <button onClick={onStart}>Start</button>
                <button onClick={onPause}>Pause</button>
                <button onClick={onReset}>Reset</button>
            </div>
        </div>
    );
}
export default ControlsAndScore;