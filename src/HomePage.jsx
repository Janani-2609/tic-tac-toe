import React from 'react'
import logo from './new-logo.png'
import './home.css'
import Footer from './Footer'

export default function HomePage({ onStartGame }) {

    return (
        <>
            <div className='home-container'>
                <img src={logo} alt="" />
                <h2>Welcome to my Gameboard</h2>
                <h1>Let's Play Tic Tac Toe</h1>
                <button 
                className="home-btn"
                onClick={onStartGame}>
                    START GAME
                </button> 
            </div>
            <Footer />
        </>
    )
}
