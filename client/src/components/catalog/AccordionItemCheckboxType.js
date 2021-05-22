import React, {useCallback, useState} from "react"
import {Icon} from "../trivia/svg-icons/Icon"

export const AccordionItemCheckboxType = ({id, filter, activeToggles, setByKey, deleteByKey}) => {
    const [isActive, setActive] = useState(false)

    const checkboxHandler = (event) => {
        const id = event.target.name
        if (event.target.type === 'checkbox') {
            if (event.target.checked) {
                setByKey(filter.key, id)
            }
            else {
                deleteByKey(filter.key, id)
            }
        }
    }

    const toggleAccordionHandler = e => {
        setActive(prevState => !prevState)
    }

    const isToggleChecked = useCallback((value) => {
        if (Array.isArray(activeToggles)) {
            return activeToggles.includes(value)
        }
        return activeToggles === value
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
                {filter.type === 'checkbox' &&
                <ul className="accordion-submenu-list">
                    {filter.items.map((item, idx) =>
                        <li key={idx}>
                            <label>
                                <input type="checkbox"
                                       className="option-input checkbox"
                                       name={item.id}
                                       checked={isToggleChecked(item.id)}
                                       onChange={checkboxHandler}/>
                                <p>{item.title}</p>
                            </label>
                        </li>)
                    }
                </ul>
                }
            </div>
        </li>
    )
}


