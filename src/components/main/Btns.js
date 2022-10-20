function Btns({ setIndex }){

    // <li onClick={ }></li> 사용될 함수()=> setIndex(0) 메인에서 만들어서 가져옴
    // 클릭하면 setIndex의 인덱스값변화
    return(
        <ul className="scroll_navi">
            <li className="on" onClick={()=> setIndex(0)}></li>
            <li onClick={()=> setIndex(1) }></li>
            <li onClick={()=> setIndex(2) }></li>
            <li onClick={()=> setIndex(3) }></li>
        </ul>
    );
}
export default Btns;