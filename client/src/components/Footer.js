import React, {useEffect, useMemo} from "react"
import '../styles/footer.css'
import {connect} from "react-redux"
import {FooterList} from "./FooterList"
import {SiteNavigationLinks} from './header/SiteNavigationLinks'
import {fetchSportTypes} from "../redux/actions";
import {Link} from "react-router-dom";

const FooterComponent = ({sections, brands, sport_types}) => {

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
                        <li><a href="https://t.me/den_churbanov" className="tg-icon" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" className="social-icon">
                                <path
                                    d="m12 24c6.629 0 12-5.371 12-12s-5.371-12-12-12-12 5.371-12 12 5.371 12 12 12zm-6.509-12.26 11.57-4.461c.537-.194 1.006.131.832.943l.001-.001-1.97 9.281c-.146.658-.537.818-1.084.508l-3-2.211-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953z"/>
                            </svg>
                        </a></li>
                        <li><a href="https://vk.com/den_churbanov" className="vk-icon" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 304.36 304.36" className="social-icon">
                                <path
                                    d="M261.945,175.576c10.096,9.857,20.752,19.131,29.807,29.982 c4,4.822,7.787,9.798,10.684,15.394c4.105,7.955,0.387,16.709-6.746,17.184l-44.34-0.02c-11.436,0.949-20.559-3.655-28.23-11.474 c-6.139-6.253-11.824-12.908-17.727-19.372c-2.42-2.642-4.953-5.128-7.979-7.093c-6.053-3.929-11.307-2.726-14.766,3.587 c-3.523,6.421-4.322,13.531-4.668,20.687c-0.475,10.441-3.631,13.186-14.119,13.664c-22.414,1.057-43.686-2.334-63.447-13.641 c-17.422-9.968-30.932-24.04-42.691-39.971C34.828,153.482,17.295,119.395,1.537,84.353C-2.01,76.458,0.584,72.22,9.295,72.07 c14.465-0.281,28.928-0.261,43.41-0.02c5.879,0.086,9.771,3.458,12.041,9.012c7.826,19.243,17.402,37.551,29.422,54.521 c3.201,4.518,6.465,9.036,11.113,12.216c5.142,3.521,9.057,2.354,11.476-3.374c1.535-3.632,2.207-7.544,2.553-11.434 c1.146-13.383,1.297-26.743-0.713-40.079c-1.234-8.323-5.922-13.711-14.227-15.286c-4.238-0.803-3.607-2.38-1.555-4.799 c3.564-4.172,6.916-6.769,13.598-6.769h50.111c7.889,1.557,9.641,5.101,10.721,13.039l0.043,55.663 c-0.086,3.073,1.535,12.192,7.07,14.226c4.43,1.448,7.35-2.096,10.008-4.905c11.998-12.734,20.561-27.783,28.211-43.366 c3.395-6.852,6.314-13.968,9.143-21.078c2.096-5.276,5.385-7.872,11.328-7.757l48.229,0.043c1.43,0,2.877,0.021,4.262,0.258 c8.127,1.385,10.354,4.881,7.844,12.817c-3.955,12.451-11.65,22.827-19.174,33.251c-8.043,11.129-16.645,21.877-24.621,33.072 C252.26,161.544,252.842,166.697,261.945,175.576L261.945,175.576z M261.945,175.576"/>
                            </svg>
                        </a></li>
                        <li><a href="https://instagram.com/den_churbanov" className="ig-icon" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" className="social-icon">
                                <path
                                    d="m12.004 5.838c-3.403 0-6.158 2.758-6.158 6.158 0 3.403 2.758 6.158 6.158 6.158 3.403 0 6.158-2.758 6.158-6.158 0-3.403-2.758-6.158-6.158-6.158zm0 10.155c-2.209 0-3.997-1.789-3.997-3.997s1.789-3.997 3.997-3.997 3.997 1.789 3.997 3.997c.001 2.208-1.788 3.997-3.997 3.997z"/>
                                <path
                                    d="m16.948.076c-2.208-.103-7.677-.098-9.887 0-1.942.091-3.655.56-5.036 1.941-2.308 2.308-2.013 5.418-2.013 9.979 0 4.668-.26 7.706 2.013 9.979 2.317 2.316 5.472 2.013 9.979 2.013 4.624 0 6.22.003 7.855-.63 2.223-.863 3.901-2.85 4.065-6.419.104-2.209.098-7.677 0-9.887-.198-4.213-2.459-6.768-6.976-6.976zm3.495 20.372c-1.513 1.513-3.612 1.378-8.468 1.378-5 0-7.005.074-8.468-1.393-1.685-1.677-1.38-4.37-1.38-8.453 0-5.525-.567-9.504 4.978-9.788 1.274-.045 1.649-.06 4.856-.06l.045.03c5.329 0 9.51-.558 9.761 4.986.057 1.265.07 1.645.07 4.847-.001 4.942.093 6.959-1.394 8.453z"/>
                                <circle cx="18.406" cy="5.595" r="1.439"/>
                            </svg>
                        </a></li>
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
                        <p>Сайт разработан к дипломной работе студентом ФГБОУ ВО СамГТУ Чурбановым Д.В.</p>
                        <p>Научный руководитель: доцент, к.т.н., Хрисанов Н.Н.</p>
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

export const Footer = connect(mapStateToProps)(FooterComponent)