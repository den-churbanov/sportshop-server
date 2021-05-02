import React, {useEffect, useMemo} from "react"
import '../styles/footer.css'
import {connect, useDispatch} from "react-redux"
import {FooterList} from "./FooterList"
import {useHttp} from "../hooks/http.hook"
import {SiteNavigationLinks} from './navigation/SiteNavigationLinks'
import {addBrands} from "../redux/actions";

const Footer = ({sections, brands}) => {
    const {request} = useHttp()
    const dispatch = useDispatch()

    useEffect(() => {
        fetchBrands()
    }, [])

    const fetchBrands = async () => {
        const brands = await request('/api/catalog/brands', 'GET')
        dispatch(addBrands(brands))
    }

    const randomBrands = useMemo(() => {
        if (!brands) return undefined
        const output = []
        while (output.length < 8){
            let rnd = Math.round(brands.length * Math.random())
            if(output.includes(brands[rnd])) continue
            output.push(brands[rnd])
        }
        return output
    }, [brands])

    return (
        <footer className="footer">
            <div className="footer__container">
                <FooterList header="Каталог" items={sections} link={'/'}/>
                <FooterList header="Меню" items={SiteNavigationLinks} link={'/'}/>
                <FooterList header="Виды спорта" items={sections} link={'/'}/>
                <FooterList header="Бренды" items={randomBrands} link={'/'}/>
            </div>
        </footer>
    );
}

const mapStateToProps = state => {
    return {
        sections: state.sections.items,
        brands: state.brands.items
    }
}

export default connect(mapStateToProps, null)(Footer);