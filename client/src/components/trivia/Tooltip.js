import React from "react"
import "../../styles/tooltip.css"

export const Tooltip = ({message, title}) => {
    return (
        <span className="tooltip" tooltip={message} flow="down">{title}</span>
    )
}