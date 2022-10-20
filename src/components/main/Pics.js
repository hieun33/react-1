function Pics({ Scrolled, start}){
    //변수 = 특정값 || 대체값;
    // 변수에 대입되는 특정값이 undefined,Nan등 오류값나오면 Scrolled - start 이 0이 안되기때문에 대체값 0을 넣어줌
    const position = Scrolled - start || 0;
    //position => 전체 스크롤 거리값에서 해당 섹션요소의 세로 위치값을 뺀것으로,
    //처음 섹션의 초입에는 0이된다.

   // console.log(Scrolled);

    return(
        <main id='pics' className='myScroll'>
           <p 
            style={{left : 100 + position,}}
        // style={
        //     position >=0
        //     ? { left :100 + position, }
        //     : null }
        >FLICKR</p>
        <h3
            style ={{
                left : 100 + position / 2,
            }}
        >FLICKR</h3>
        </main>
    );
}

export default Pics;