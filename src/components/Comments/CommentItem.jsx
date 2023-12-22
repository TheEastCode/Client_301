import React from 'react'
import Comment from './Comment';

const CommentList = ({ comments }) => {
    return (
        <div className="comment-list">
            {comments.map(comment => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </div>
    );
};

  export default CommentList;