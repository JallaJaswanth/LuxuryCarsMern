import React from 'react'
import './Toggle.css'
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';
import { themeContext } from '../Context';
import { useContext } from 'react';

function Toggle() {

    const theme = useContext(themeContext)
    const darkMode = theme.state.darkMode

    const handleClick = () => {
        theme.dispatch({ type: 'toggle' })
    }

    return (
        <div className='toggle' onClick={handleClick}>
            <BsSun className='mr-2' />
            <BsMoon />
            <div className='t-button' style={darkMode ? { left: '2px' } : { right: "2px" }}>

            </div>
        </div>
    )
}

export default Toggle