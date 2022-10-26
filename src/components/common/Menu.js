import { useState, forwardRef, useImperativeHandle } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';


//menu 컴포넌트 함수를 화살표함수로 변경해서 forwardRef메서드의 인수로 절달
// forwardRef로 부모컴포넌트 있는 값을 props를 이용해서 자식에게 전달

const Menu = forwardRef((props, ref) => {
    const [Open, setOpen] = useState(false);
    const active = {color:'orange'};

    useEffect(()=>{
        window.addEventListener('resize',()=>{
            const wid=window.innerWidth;
            if(wid>=1200) setOpen(false);
        })
    },[])

    //부모 컴포넌트의 참조객체에 담길 객체를 리턴 (이때, 해당객체안에는 함수를 담아서 전달)
    useImperativeHandle(ref,()=>{
        return{
            toggle: () => setOpen(!Open)
        }
    })

    return (
        <AnimatePresence>
            {Open && (
                <motion.nav 
                id='mobileMenu'
                initial={{opacity:0, x:-320}}
                animate={{opacity:1, x:0, transition:{duration:0.5}}}
                exit={{opacity:0, x:-320, transition:{duration:0.5}}}
                onClick={()=>setOpen(false)}
                // 자동으로 패널닫히게 하기
                >
                    <h1>
                        <Link to='/'>
                            <img src={process.env.PUBLIC_URL + '/img/logo_w.png'} alt="logo" />
                        </Link>
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
                </motion.nav>
            )}    

        </AnimatePresence>

    );
})

export default Menu;