function Intro({ Scrolled, start}){
    //변수 = 특정값 || 대체값;
    // 변수에 대입되는 특정값이 undefined,Nan등 오류값나오면 Scrolled - start 이 0이 안되기때문에 대체값 0을 넣어줌
    const position = Scrolled - start || 0;
    //position => 전체 스크롤 거리값에서 해당 섹션요소의 세로 위치값을 뺀것으로,
    //처음 섹션의 초입에는 0이된다.

   // console.log(Scrolled);

    return(
        <main id='intro' className='myScroll'>
            <h1>INGREDIENS</h1>
            <div className="inner">
                <div className="wrap">
                    <article>
                        <h2>Organic Cotton</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus incidunt aliquid molestiae, perferendis at illo nemo dicta eligendi pariatur consequatur exercitationem delectus, in reprehenderit a.</p> 
                    </article>   
                    <article>
                        <h2>Hydrating Serum</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus incidunt aliquid molestiae, perferendis at illo nemo dicta eligendi pariatur consequatur exercitationem delectus, in reprehenderit a.</p> 
                    </article>
                </div>
                        
                <div className="wrap">                    
                    <img src={process.env.PUBLIC_URL + '/img/p2.png'} alt="제품사진" />                                           
                </div>   

                <div className="wrap">
                    <article>
                        <h2>Carbon Active</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus incidunt aliquid molestiae, perferendis at illo nemo dicta eligendi pariatur consequatur exercitationem delectus, in reprehenderit a.</p> 
                    </article>
                    <article>
                        <h2>Oil Control Essence</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus incidunt aliquid molestiae, perferendis at illo nemo dicta eligendi pariatur consequatur exercitationem delectus, in reprehenderit a.</p>                             
                    </article>
                </div>      
            </div> 


            <h3>15 minutes a week. All your skin needs.Hydration. Purity. Oil control.
            </h3>

            <h4>
                A sheet of 100% organic cotton that makes sure that the most beneficial ingredients for your<br /> skin are actually absorved deep into your skin instead of evaporating away
            </h4>
        </main>
    );
}

export default Intro;