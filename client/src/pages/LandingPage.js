import React, {useEffect} from "react"
import "../styles/landing.css"
import {OffersSlider} from "../components/landing/OffersSlider"
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import manImg from "../images/landing/section_boots/man.jpg"
import womanImg from "../images/landing/section_boots/woman.jpg"
import stock1 from "../images/landing/stocks/4_1.png"
import stock2 from "../images/landing/stocks/4_2.png"
import stock3 from "../images/landing/stocks/4_3.png"
import stock4 from "../images/landing/stocks/4_4.png"
import {fetchBrands, fetchSportTypes} from "../redux/actions"
import {Loader} from "../components/Loader"
import {BrandPreview} from "../components/landing/BrandPreview"
import {ProductSlider} from "../components/landing/ProductSlider"

const LandingPage = ({brands, getBrands, sport_types, getSportTypes}) => {

    useEffect(() => {
        if (!brands.length) getBrands()
        if(!sport_types.length) getSportTypes()
    }, [])

    return (
        <div className="landing_container">
            <section className="special-offer-section">
                <OffersSlider/>
            </section>

            <section className="new-products-section">
                <div className="headers">
                    <h4>Новинки</h4>
                    <Link to="/catalog/new">Все новинки</Link>
                </div>

                <ProductSlider productsType="new"/>
            </section>

            <section className="sales-products-section">
                <div className="headers">
                    <h4>Скидки</h4>
                    <Link to="/catalog/sales">Все скидки</Link>
                </div>
                <ProductSlider productsType = "sales"/>
            </section>

            <section className="boots-section">
                <Link to="/catalog?section=1&gender=male" className="boots-image">
                    <img src={manImg} alt="Мужская обувь"/>
                </Link>
                <Link to="/catalog?section=1&gender=female" className="boots-image">
                    <img src={womanImg} alt="Женская обувь"/>
                </Link>
            </section>

            <section className="hit-products-section">
                <div className="headers">
                    <h4>Хиты продаж</h4>
                    <Link to="/catalog/hits">Все хиты</Link>
                </div>
                <ProductSlider productsType = "hits"/>
            </section>

            <section className="stock-section">
                <h4>Акции</h4>
                <div className="container">
                    <div className="stock-wrapper">
                        <Link to="/catalog?brand=5">
                            <img src={stock1} alt=""/>
                        </Link>
                    </div>
                    <div className="stock-wrapper">
                        <Link to="/catalog?subsection=42">
                            <img src={stock2} alt=""/>
                        </Link>
                    </div>
                    <div className="stock-wrapper">
                        <Link to="/catalog?subsection=3">
                            <img src={stock3} alt=""/>
                        </Link>
                    </div>
                    <div className="stock-wrapper">
                        <Link to="/stub">
                            <img src={stock4} alt=""/>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="brands-section">
                <h4>Бренды</h4>
                <div className="container">
                    {brands ? brands.map((brand, idx) =>
                        <BrandPreview brand={brand} key={idx}/>) : <Loader/>}
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        brands: state.catalog.brands,
        sport_types: state.catalog.sport_types,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getBrands: async () => dispatch(fetchBrands()),
        getSportTypes: () => dispatch(fetchSportTypes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)