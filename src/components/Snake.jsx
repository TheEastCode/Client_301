import React, { useState } from 'react';
function Snake() {

  return (
    <div>
          <div className="snake-container">
          <iframe
            src="https://minisnake.netlify.app/game"
            width="950"
            height="875"
            title="Embedded Snake Game"
          ></iframe>
          </div>
    </div>
  );
}

export default Snake;