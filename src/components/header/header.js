import React from 'react';
import './style.css';

const Header = props => {
    return (
        <div className="navbar navbar-expand-lg text-white">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item space">
                    <h1>Space Memory Game</h1>
                </li>
                <li id='message' className="nav-item">
                    <h3>{props.message}</h3>
                </li>
                <li id='score' className="nav-item">
                    <h3>Score: {props.score}</h3>
                </li>
                <li id='highscore' className="nav-item">
                    <h3>High Score: {props.highScore}</h3>
                </li>
            </ul>
        </div>  
    )
}
export default Header;