import React from 'react'
import { Link } from 'react-router-dom'

const Button = props => {
    const { className, linkTo } = props; 
    return (
        <div className={className}>
            <Link to={linkTo}>Add a book</Link>
        </div>
    )
}

export default Button
