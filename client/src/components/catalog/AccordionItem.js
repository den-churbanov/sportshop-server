import React, {useState} from "react"
import {Icon} from "../svg-icons/Icon";

export const AccordionItem = ({id, title, refer}) => {

    const [isActive, setActive] = useState(false)
    const data = new Array(5).fill('').map((_, idx) => `Item ${idx}`)
    const toggleLinkHandler = e => {
        setActive(prevState => !prevState)
    }

    return (
        <li className={`accordion-menu-item${isActive ? ' open' : ''}`}>
            <label htmlFor={`accord-${id}`} className="dropdown_link">
                <div className="title">
                    <p>{title}</p>
                    <div className="accordion-arrow">
                        <Icon name="down-arrow"/>
                    </div>
                </div>
                <input type="checkbox" id={`accord-${id}`} onClick={toggleLinkHandler}/>
                <ul className="accordion-submenu-list">
                    {data ? data.map((item, idx) =>
                        <li>

                            {/*<label>*/}
                            {/*    <input type="checkbox" className="option-input checkbox" name={``}/>*/}
                            {/*    <p>Checkbox</p>*/}
                            {/*</label>*/}
                            <label>
                                <input type="radio" className="option-input radio" name={``}/>
                                <p>Radio option</p>
                            </label>
                        </li>
                    ) : null}
                </ul>
            </label>
        </li>
    )
}

export const accordionsType = [
    {
        title: 'Новинка',
        ref: 'new',
        items: [
            {
                title: 'Да',
                checked: false
            },
            {
                title: 'Нет',
                checked: true
            }
        ],
        type: 'radio'
    },
    {
        title: 'Распродажа',
        ref: 'sale',
        items: [
            {
                title: 'Да',
                checked: false
            },
            {
                title: 'Нет',
                checked: true
            }
        ],
        type: 'radio'
    },
    {
        title: 'Виды спорта',
        ref: 'sport_types',
        items: undefined,
        type: "checkbox"
    },
    {
        title: 'Пол',
        ref: 'gender',
        items: [
            {
                title: 'Мужской',
                id: 'male'
            },
            {
                title: 'Женский',
                id: 'female'
            },
            {
                title: 'Унисекс',
                id: 'unisex'
            }
        ],
        type: "checkbox"
    },
    {
        title: 'Бренд',
        ref: 'brands',
        items: undefined,
        type: "checkbox"
    },
    {
        title: 'Категория товаров',
        ref: 'sections',
        items: undefined,
        type: "checkbox"
    },
    {
        title: 'Размеры',
        ref: 'sizes',
        items: undefined,
        type: "checkbox"
    }]