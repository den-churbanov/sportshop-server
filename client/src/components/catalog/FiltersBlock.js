import React, {useEffect, useMemo} from "react"
import {AccordionItemRadioType} from "./AccordionItemRadioType"
import {connect} from "react-redux"
import {fetchAllSizes} from "../../redux/actions"
import {AccordionItemCheckboxType} from "./AccordionItemCheckboxType"
import {useQueryParams} from "../../hooks/query.params.hook"
import {useHistory} from "react-router-dom"

const FiltersBlockComponent = ({sections, brands, sport_types, sizes, getAllSizes, isActive, toggleActive, loading}) => {

    useEffect(() => {
        getAllSizes()
    }, [getAllSizes])

    const {params, parseToQueryString, deleteByKey, setByKey, setByKeyRadio} = useQueryParams()
    const history = useHistory()

    const accordions = useMemo(() => ([
        {
            title: 'Новинка',
            key: 'new',
            items: [
                {
                    id: 1,
                    title: 'Да'
                },
                {
                    id: 0,
                    title: 'Нет'
                }
            ],
            type: 'radio'
        },
        {
            title: 'Распродажа',
            key: 'sale',
            items: [
                {
                    id: 1,
                    title: 'Да'
                },
                {
                    id: 0,
                    title: 'Нет'
                }
            ],
            type: 'radio'
        },
        {
            title: 'Виды спорта',
            key: 'sport_type',
            items: sport_types,
            type: "checkbox"
        },
        {
            title: 'Пол',
            key: 'gender',
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
            key: 'brand',
            items: brands,
            type: "checkbox"
        },
        {
            title: 'Категория товаров',
            key: 'section',
            items: sections,
            type: "checkbox"
        },
        {
            title: 'Размеры',
            key: 'size',
            items: sizes,
            type: "checkbox"
        }]), [sections, sport_types, sizes, brands])

    const toggleMenu = () => {
        toggleActive && toggleActive(prevState => !prevState)
    }

    const resetHandler = () => {
        history.push('/catalog')
    }

    const submitHandler = () => {
        history.push(`/catalog?${parseToQueryString()}`)
        toggleMenu()
    }

    return (
        <div className={`catalog-filters-block${isActive? ' active':''}`}>
            <div className= {`filters-content`}>
                <ul className="accordion-menu">
                    {accordions.map((filter, idx) => {
                        if (filter.type === 'checkbox')
                            return <AccordionItemCheckboxType key={idx}
                                                              filter={filter}
                                                              activeToggles={params[filter.key]}
                                                              id={idx}
                                                              setByKey={setByKey}
                                                              deleteByKey={deleteByKey}/>
                        return <AccordionItemRadioType key={idx}
                                                       filter={filter}
                                                       activeToggles={params[filter.key]}
                                                       id={idx}
                                                       setByKeyRadio={setByKeyRadio}/>
                    })}
                    <div className="btn-wrapper">
                        <button className="filter-button reset-btn"
                                disabled={loading}
                                onClick={resetHandler}>Сбросить</button>
                        <button className="filter-button ok-btn"
                                disabled={loading}
                                onClick={submitHandler}>Применить</button>
                    </div>
                </ul>
            </div>
        </div>

    )
}

const mapStateToProps = state => (
    {
        sections: state.catalog.sections,
        brands: state.catalog.brands,
        sport_types: state.catalog.sport_types,
        sizes: state.catalog.sizes
    }
)
const mapDispatchToProps = dispatch => (
    {
        getAllSizes: () => dispatch(fetchAllSizes()),
    }
)

export const FiltersBlock = connect(mapStateToProps, mapDispatchToProps)(FiltersBlockComponent)