import React from 'react'
import IconsSVG from './icons.svg'

export const Icon = ({name, className, viewBox}) => {
    return (
        <svg className={`${className ? className : ''}`} >
            <use xlinkHref={`${IconsSVG}#${name}-icon`}/>
        </svg>
    )
}
