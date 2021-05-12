import React, {useEffect} from "react"
import "../styles/landing.css"
import {useHttp} from "../hooks/http.hook"
import {Slider} from "../components/landing/Slider"
import {Link} from "react-router-dom"
import manImg from "../images/landing/section_boots/man.jpg"
import womanImg from "../images/landing/section_boots/woman.jpg"
import stock1 from "../images/landing/stocks/4_1.png"
import stock2 from "../images/landing/stocks/4_2.png"
import stock3 from "../images/landing/stocks/4_3.png"
import stock4 from "../images/landing/stocks/4_4.png"
import {addBrands} from "../redux/actions"
import {useDispatch, connect} from "react-redux"


const LandingPage = ({brands}) => {

    const {request} = useHttp()
    const dispatch = useDispatch()

    useEffect(() => {
        fetchBrands()
    }, [])

    const fetchBrands = async () => {
        const brands = await request('/api/catalog/brands', 'GET')
        dispatch(addBrands(brands))
    }

    return (
        <div className="landing_container">
            <section className="special-offer-section">
                <Slider/>
            </section>
            <section className="stock-section">
                <h3>Акции</h3>
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
            <section className="boots-section">
                <Link to="/catalog?gender=male" className="boots-image">
                    <img src={manImg} alt="Мужская обувь"/>
                </Link>
                <Link to="/catalog?gender=female" className="boots-image">
                    <img src={womanImg} alt="Женская обувь"/>
                </Link>
            </section>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        brands: state.brands.items
    }
}

export default connect(mapStateToProps, null)(LandingPage)