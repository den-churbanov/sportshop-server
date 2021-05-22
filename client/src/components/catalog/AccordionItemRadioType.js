import React, {useCallback, useState} from "react"
import {Icon} from "../trivia/svg-icons/Icon"

export const AccordionItemRadioType = ({id, filter, activeToggles, setByKeyRadio}) => {
    const [isActive, setActive] = useState(false)

    const toggleAccordionHandler = e => {
        setActive(prevState => !prevState)
    }

    const radioButtonHandler = (event) => {
        const key = event.target.name
        const value = !!Number.parseInt(event.target.value)
        if (event.target.type === 'radio') {
            setByKeyRadio(key, value)
        }
    }

    const isToggleChecked = useCallback((value) => {
        return !!activeToggles === value
    }, [activeToggles])

    return (
        <li className={`accordion-menu-item${isActive ? ' open' : ''}`}>
            <div className="dropdown_link">
                <label className="title" htmlFor={`accord-${id}`}>
                    <p>{filter.title}</p>
                    <div className="accordion-arrow">
                        <Icon name="down-arrow"/>
                    </div>
                </label>
                <input type="checkbox"
                       id={`accord-${id}`}
                       checked={isActive}
                       onChange={toggleAccordionHandler}/>
                {filter.type === 'radio' &&
                <div className="accordion-submenu-list">
                    {filter.items.map((item, idx) =>
                        <label key={idx}>
                            <input type="radio"
                                   className="option-input radio"
                                   name={filter.key}
                                   value={item.id}
                                   checked={isToggleChecked(!!item.id)}
                                   onChange={radioButtonHandler}/>
                            <p>{item.title}</p>
                        </label>
                    )}
                </div>
                }
            </div>
        </li>
    )
}

