import React from 'react'

function SideBar({ auth0, handleShowGoalModal }) {

    return (
        <div className='sidebar shadow-lg'>
            {/* Left side navigation */}
            <div className='sidebar-header'>
                <h3>Welcome {auth0.user.nickname}</h3>
            </div>
            <nav className='sidebar-nav'>
                <ul>
                    {/* Navigation links */}
                    <li>
                        <a href='#' onClick={handleShowGoalModal}>
                            Add New Goal
                        </a>
                    </li>
                    <li>
                        <a href='#'>Add Comment</a>
                    </li>
                    <li>
                        <a href='#'>Play Snake</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SideBar