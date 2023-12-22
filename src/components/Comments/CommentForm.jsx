import React, { useState } from 'react';

const NewCommentForm = ({ onSubmit }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ text });
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
            />
            <button type="submit">Post Comment</button>
        </form>
    );
};

  export default Comment;