import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Menu from './Menu';

export default function Header(props) {
    const menu = useRef(null);    
    const active = { color: 'orange' };

    let url = '';
    props.type ==='main'
        ? (url = process.env.PUBLIC_URL + '/img/logo_b.jpg')
        : (url = process.env.PUBLIC_URL + '/img/logo_b.jpg')
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
                        <NavLink to='/About' activeStyle={active}>
                            About
                        </NavLink>

                    </li>
                    <li>
                        <NavLink to='/News' activeStyle={active}>
                            News
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
                    {/* <li>
                        <NavLink to='/signup' activeStyle={active}>
                            Sign up
                        </NavLink>
                    </li> */}
                </ul>
                <FontAwesomeIcon icon={faBars} onClick={()=>menu.current.toggle()} />
            </div>

            {/* menu.current에 담기는 값은 자식컴포넌트에서 useImperativeHandle이 내보내주고 있는 toggle함수 */}
            <Menu ref={menu} />
        </header>
    )
}

