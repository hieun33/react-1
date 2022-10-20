import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
export default function Header(props) {
    const active = { color: 'orange' };

    let url = '';
    props.type ==='main'
        ? (url = process.env.PUBLIC_URL + '/img/logo_w.png')
        : (url = process.env.PUBLIC_URL + '/img/logo_b.png')
    //프롭스의 타입이 메인이라면
    //메인이면 _W 아니면 _b
  
  
    return (
        <header className={props.type}>
            <div className="inner">
                <h1>
                    <Link to='/'>
                        <img src={url} alt="logo" />
                    </Link>
                    {/* <NavLink exact to='/' activeStyle={active}>
                            LOGO
                        </NavLink> */}
                </h1>
                <ul id="gnb">
                    <li>
                        <NavLink to='/department' activeStyle={active}>
                            Department
                        </NavLink>

                    </li>
                    <li>
                        <NavLink to='/community' activeStyle={active}>
                            Community
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/gallery' activeStyle={active}>
                            Gallery
                        </NavLink>

                    </li>
                    <li>
                        <NavLink to='/youtube' activeStyle={active}>
                            Youtube
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/location' activeStyle={active}>
                            Location
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/member' activeStyle={active}>
                            Member
                        </NavLink>
                    </li>
                </ul>
                <FontAwesomeIcon icon={faBars} />
            </div>
        </header>
    )
}

