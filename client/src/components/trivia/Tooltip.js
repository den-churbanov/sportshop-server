import React from "react"
import "../../styles/tooltip.css"

export const Tooltip = ({tooltip, title}) => {
    return (
        <span className="tooltip" tooltip={tooltip} flow="right">{title}</span>
    )
}