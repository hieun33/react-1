
function Banner(){


    return(
        <main id='ban' className="banner">
            <div className="inner">
              <div className="wrap">
                <article>
                    <img src={process.env.PUBLIC_URL+'/img/p3.png'} alt="튜브형제품과사은품가방" />
                </article>
                <article>
                    <h1>EARLY BIRDS: AN UNMISSABLE OFFER</h1>
                    <p>An unmissable offer for the first ones to book 25$ worth of free stuff!!</p>
                    <a href="#">ORDER NOW</a>
                </article>
              </div>
            </div>
        </main>
    );

}

export default Banner;