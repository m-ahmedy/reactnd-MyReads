import React from 'react'
import { Link } from 'react-router-dom'

const Button = props => {
    const { className, linkTo, title } = props; 
    return (
        <div className={className}>
            <Link
                to={linkTo}
            >
                {title}
            </Link>
        </div>
    )
}

export default Button
