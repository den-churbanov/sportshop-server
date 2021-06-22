import React, {useEffect, useMemo} from "react"
import '../styles/footer.css'
import {connect} from "react-redux"
import {FooterList} from "./FooterList"
import {SiteNavigationLinks} from './header/SiteNavigationLinks'
import {fetchBrands, fetchSportTypes} from "../redux/actions"
import {Link} from "react-router-dom"
import {Icon} from "./trivia/svg-icons/Icon"

const FooterComponent = ({sections, brands, sport_types, getBrands, getSportTypes}) => {

    useEffect(() => {
        getBrands()
        getSportTypes()
    }, [getBrands, getSportTypes])

    const randomBrands = useMemo(() => {
        if (!brands.length) return undefined
        const output = []
        while (output.length < 8) {
            let rnd = Math.round(brands.length * Math.random())
            if (output.includes(brands[rnd])) continue
            output.push(brands[rnd])
        }
        return output
    }, [brands])

    const subscribeSubmitHandler = event => {
        event.preventDefault()
    }

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__column">
                    <div className="footer-contacts">
                        <div className="number-block">
                            <a href="tel:79278988843">+7 (927) 898-88-43</a>
                        </div>
                        <h6>Звонок по России бесплатный</h6>
                        <p>Ежедневно с 8:00 до 24:00 (Самара)</p>
                    </div>
                    <span className='splitter'/>

                    <form className="subscribe-form" onSubmit={subscribeSubmitHandler}>
                        <h6>Подписка</h6>
                        <input type="email" size="30" placeholder="Введите email"/>
                        <button type="submit">Подписаться</button>
                    </form>
                    <h6>
                        Мы в соцсетях
                    </h6>
                    <ul className="social-menu">
                        <li>
                            <a href="https://t.me/den_churbanov"
                               className="tg-icon"
                               target="_blank"
                               rel="noopener noreferrer">
                                <Icon name="tg" className="social-icon"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://vk.com/den_churbanov"
                               className="vk-icon"
                               target="_blank"
                               rel="noopener noreferrer">
                                <Icon name="vk" className="social-icon"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com/den_churbanov"
                               className="ig-icon"
                               target="_blank"
                               rel="noopener noreferrer">
                                <Icon name="ig" className="social-icon"/>
                            </a>
                        </li>
                    </ul>
                </div>
                <FooterList header="Каталог" items={sections} link="/catalog?section="/>
                <FooterList header="Меню" items={SiteNavigationLinks} link={'/stub'}/>
                <FooterList header="Виды спорта" items={sport_types} link="catalog?sport_type="/>
                <FooterList header="Бренды" items={randomBrands} link="catalog?brand="/>
                <div className="footer__column">
                    <h4>
                        Основной каталог
                    </h4>
                    <ul className="footer__link_list">
                        <li>
                            <Link to="/catalog?gender=male" target="_blank">
                                Мужское
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog?gender=female" target="_blank">
                                Женское
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog/sales" target="_blank">
                                Распродажа
                            </Link>
                        </li>

                        <span className='splitter'/>

                        <li><Link to="/profile" target="_blank">
                            Мой кабинет
                        </Link></li>
                        <li><Link to="/profile/private" target="_blank">
                            Личные данные
                        </Link></li>
                        <li><Link to="/profile/orders" target="_blank">
                            Текущие заказы
                        </Link></li>
                        <li><Link to="/profile/orders/history" target="_blank">
                            История заказов
                        </Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer_info">
                <div className="footer_description">
                    <h2>
                        Сеть экипировочных центров SportShop
                    </h2>
                    <p>
                        Официально представляет в России спортивные товары ASICS (Япония), Mizuno (Япония), Mikasa
                        (Япония), Macron (Италия), KvRezak.
                    </p>
                    <p>На сайте и в магазинах вы приобретёте отличную экипировку для команды, купите взрослую и детскую
                        спортивную одежду, обувь, форму, средства защиты, медицинские товары для спорта. Все товары
                        одобрены экспертами, снабжены сертификатами производителя. Особое предложение — изготовление
                        командной экипировки на заказ, с вашим логотипом!</p>
                    <p>
                        Мы работаем с частными покупателями и организациями, оформляем полный пакет документов для
                        оптовых официальных закупок, помогаем с участием в тендерах, практикуем другие формы
                        индивидуального сотрудничества. Станьте нашим покупателем и получайте до 20 % скидки на все
                        товары!
                    </p>
                </div>
            </div>
            <div className="footer_copyright">
                <div className="footer_copyright_container">
                    <div className="copyright_block">
                        <span>&copy;</span>
                        <span> SPORTSHOP 2021</span>
                    </div>
                    <div className="copyright_block">
                        <p>Сайт разработан к дипломной работе студентом ФГБОУ ВО СамГТУ <br/>Чурбановым Д.В.</p>
                        <p>Научный руководитель: доцент, к.т.н., <br/>Хрисанов Н.Н.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const mapStateToProps = state => {
    return {
        sections: state.catalog.sections,
        brands: state.catalog.brands,
        sport_types: state.catalog.sport_types
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBrands: async () => dispatch(fetchBrands()),
        getSportTypes: async () => dispatch(fetchSportTypes()),
    }
}

export const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterComponent)