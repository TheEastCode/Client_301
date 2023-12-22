import React from 'react'
import ImageGenerator from './ImageGenerator'

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
                        <a href='/' onClick={handleShowGoalModal}>
                            Add New Goal
                        </a>
                    </li>
                    <li>
                        <a href='/comments'>Add Comment</a>
                    </li>
                    <li>
                        <a href='/snake'>Play Snake</a>
                    </li>
                </ul>
                {/* <ImageGenerator auth0={auth0} /> */}

            </nav>
        </div>
    )
}

export default SideBar