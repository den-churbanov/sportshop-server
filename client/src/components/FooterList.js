import React from "react";
import {Link} from "react-router-dom";
import '../styles/footer.css';

export const FooterList = ({items, header, link}) => {
    return (
        <div className="footer__column">
            <h4>
                {header}
            </h4>
            <ul className="footer__link_list">
                {items && items.map((item, idx) =>
                    item &&
                    <li key={idx}>
                        <Link to={link + item.id} target={'_blank'}>
                            {item.title}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );

}