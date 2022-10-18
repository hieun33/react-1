import { useEffect } from "react";
//useEffect를 통해 팝되었을때 스크롤 안되게 오버플로우 히든부여
//html 에서는 scss에 부여하지만 리액트에서는 js에 부여


function Popup(props){ 
    useEffect(()=>{
        document.body.style.overflow = "hidden";
        //overflow = "hidden";으로 팝업시 스크롤안생기게부여

        return()=>{
            document.body.style.overflow = "auto";
        }
        //클린업함수 사용, 팝업클로즈 후 overflow hidden 오토로 바꿔서 다시 위아래 스크롤로 움직일수있게함.
    },[]);
    



    return(
        <aside className="pop">
            <div className="con">{props.children}</div>
            <span className="close" onClick={()=>{props.setOpen(false)}}>Close</span>
        </aside>
    );
}

export default Popup;