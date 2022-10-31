import React from "react"
export default function Footer() {
    return (
        <footer>
            <div className="inner">
                <div className="wrap">
                <img src={process.env.PUBLIC_URL+'/img/logo_f.jpg'} alt="푸터용로고회색" />

                        <article>
                            <h1>Company</h1>
                            <ul>
                                <li><a href="#">about us</a></li>
                                <li><a href="#">contact</a></li>
                                <li><a href="#">Search</a></li>
                            </ul>
                        </article>
                        <article>
                            <h1>Account</h1>
                            <ul>
                                <li><a href="#">Login</a></li>
                                <li><a href="#">Signup</a></li>
                                
                            </ul>
                        </article>
                        <article>
                            <h1>Social</h1>
                            <ul>
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Github</a></li>
                                <li><a href="#">Instagram</a></li>
                            </ul>
                        </article>                </div>
                
                {/* <p>2022 EUNHYE &copy; ALL RIGHT RESERVED</p> */}
            </div>
        </footer>
    )
}