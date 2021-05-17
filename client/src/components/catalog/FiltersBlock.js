import React from "react"
import {AccordionItem, accordionsType} from "./AccordionItem";
import {connect} from "react-redux";
import {fetchSizes} from "../../redux/actions";

const FiltersBlockComponent = ({sport_types, brands, sections}) => {
    return (
        <div className="catalog-filters-block">
            <div className="filters-content">
                <ul className="accordion-menu">
                    {accordionsType.map((type, idx) => {
                            return <AccordionItem id={idx} title={type.title} refer={type.ref} key={idx}/>
                        }
                    )}
                    <div className="btn-wrapper">
                        <button className="button reset-btn">Сбросить</button>
                        <button className="button ok-btn">Применить</button>
                    </div>
                </ul>
            </div>
        </div>

    )
}

const mapStateToProps = state =>(
    {
        sections: state.catalog.sections,
        brands: state.catalog.brands,
        sport_types: state.catalog.sport_types
    }
)

const mapDispatchToProps = dispatch =>(
    {
        getSizes: () => dispatch(fetchSizes()),
    }
)
export const FiltersBlock = connect(mapStateToProps, mapDispatchToProps)(FiltersBlockComponent)