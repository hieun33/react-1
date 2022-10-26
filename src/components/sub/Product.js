import { useEffect, useRef, useState } from "react";
import Layout from "../common/Layout";
export default function Product() {

    
    //더미데이터를 news에 써잇는거를 가져옴.
    const getLocalData = () => {
        const data = localStorage.getItem('post');
        return JSON.parse(data);
    };
    /*
    보통 데이터들은 새로고침이나 재접속시 초기화된다  <---session storage 브라우저를 종료하면 날라가는 휘발성 저장공간
    이러한 데이터를 기억하기 위해서는
    1. 서버로 보내서 데이터베이스에 저장
    2. 브라우저가 가지고 있는 임시저장공간 즉 localstorage에 저장한다.
    브라우저를 청소하거나 직접 localstorage를 지우지 않는한 사라지지 않음 5MB정도 '텍스트'를 저장할 수 있음

     */
    
    //제목,텍스트 쓰는거 useref로 만들기 
    const input = useRef(null);
    const textarea = useRef(null);
    const inputEdit = useRef(null);
    const textareaEdit = useRef(null);

    //저장된글 배열
    const [Posts, setPosts] = useState(getLocalData);
    const [Allowed, setAllowed] = useState(true);

    /*
    Posts = [
            {title : input.current.value,
            content : textarea.current.value},
            {title : input.current.value,
            content : textarea.current.value},
            {title : input.current.value,
            content : textarea.current.value}
        ]
    */

    //지우는 함수 // input의 current라는 상자의 value(우리가 쓴값)
    const resetForm = () => {
        input.current.value = '';
        textarea.current.value = '';

        //초기화 함수에서 해당모드 즉 해당 값을 참조했을때만 초기화 되도록 설정
        if (inputEdit.current) {        //inputedit에 현 값이 존재하면
            inputEdit.current.value = '';
            textareaEdit.current.value = '';
        }
    }


    //조건 ? 참이면 이코드 : 거짓이면 이코드

    //글저장함수 
    const createPost = () => {

        //trim으로 공백을 지우고 value봣을때 존재하지 않으면 resetform
        if (!input.current.value.trim() || !textarea.current.value.trim()) {
            resetForm();
            return alert('제목과 본문을 모두 입력하세요');
        }
        //존재하면 setposts
        setPosts([

            {
                title: input.current.value,
                content: textarea.current.value
            },
            ...Posts,
        ]);
        resetForm();
    };
    //글 삭제함수
    const deletePost = (index) => {
        console.log(index);

        setPosts(Posts.filter((_, idx) => idx !== index));
        /*        
        filter() 메서드는 자바스크립트 배열의 내장함수
        주어진 함수의 테스트를 통과하는 모든 요소를 모아 true면 요소를 유지하고 false면 삭제
        새로운 배열로 변환하기 때문에 전개연산자를 쓰지않아도 불변성이 유지된다
        
        (처리할대상이되는배열Posts).filter((처리할요소값,요소의인덱스)=>조건값 즉, 테스트값)
        return안써도 반환이됨.

        글 삭제함수로 들어온 index는 밑에 delete버튼을 클릭한 특정인덱스값이다
        idx는 filter안에서 반복을 돌리고 있는 순번을 나타낸다.
        idx !== index 뜻은 
        반복을 돌리는 인덱스와 지워야 하는 인덱스가 같은값이 되면 지워야 하는데 
        false로 출력되어야하니까 저렇게 코드를 사용

        // post, idx 각각의 반복을 도는 객체와 인덱스*/
    };

    //글 수정모드 변경 함수 =  post.enableUpdate = true; 부여까지만 함. 그럼 return으로 내려감
    const enableUpdate = (index) => {
        if (!Allowed) return;  //false이면 return으로 막음
        setAllowed(false);
        setPosts(
            Posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = true;
                return post;
            })
        );
    };

    const disableUpdate = (index) => {
        setAllowed(true);
        setPosts(
            Posts.map((post, idx) => {
                if (idx === index) post.enableUpdate = false;
                return post;
            })
        );
    };


    //실제 글 수정함수
    const updatePost = (index) => {
        if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
            resetForm();
            return alert('수정할 제목과 본문을 모두 입력하세요');
        }
        setAllowed(true);
        setPosts(
            Posts.map((post, idx) => {
                if (idx === index) {
                    post.title = inputEdit.current.value;
                    // 수정한곳(inputEdit의 값을 post의 값에다가 대입해줌)
                    post.content = textareaEdit.current.value;
                    //수정한곳(textareaEdit의 값을 post의 값에다가 대입해줌)
                    post.enableUpdate = false;
                    //수정불가능 false
                }
                return post;
            })
        );
    };

    

    //Posts의 값이 변경될때마다 콘솔출력해서 우리가 볼수 있는 
    useEffect(()=>{
        console.log(Posts);

        /*
        데이터를 스토리지에 저장하기 : setItem ('key','value');
        JSON.stringify(Posts) 메소드로 문자화시켜서 저장해야한다.
        */
        
        localStorage.setItem('post', JSON.stringify(Posts));

    }, [Posts]);

    
    //계속 post가 업데이트 될때마다 불러오기

    return (
        <Layout name={"Product"}>
            <div className="inputBox">
                <input type="text" placeholder="제목을 입력하세요" ref={input} />
                <br />
                <textarea cols="30" rows="5" placeholder="본문을 입력하세요" ref={textarea}></textarea>
                <br />
                <div className="btnSet">
                    <button onClick={resetForm}>CANCLE</button>
                    <button onClick={createPost}>WRITE</button>
                </div>
                
            </div>

            <div className="showBox">
                {Posts.map((post, idx) => {
                    return (
                        <article key={idx}>

                            {
                                post.enableUpdate ? (
                                //반복도는 post에서 enableUpdate true인가요? 물어보는것.
                                //true일때 -> 수정모드로 랜더링
                                <>
                                        <div className="editTxt">
                                            <input type="text" defaultValue={post.title} ref={inputEdit} />
                                            <br />
                                            <textarea cols='30' rows='4' defaultValue={post.content} ref={textareaEdit}>

                                            </textarea>
                                        </div>
                                        <div className="btnSet">
                                            <button onClick={() => disableUpdate(idx)}>CANCLE</button>
                                            <button onClick={() => updatePost(idx)}>UPDATE</button>
                                        </div>
                                    </>
                                ) : (
                                //반복도는 post에서 enableUpdate = false거나 없으aus 일반출력모드로 랜더링
                                <>
                                        <div className="txt">
                                            <h2>{post.title}</h2>
                                            <p>{post.content}</p>
                                        </div>
                                        <div className="btnSet">
                                            <button onClick={() => enableUpdate(idx)}>EDIT</button>
                                            <button onClick={() => deletePost(idx)}>DELELTE</button>
                                        </div>
                                    </>
                                )


                            }

                        {/* <div className="txt">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                                                
                        <div className="btnSet">
                            <button onClick={() => enableUpdate(idx)}>EDIT</button>
                            <button onClick={() => deletePost(idx)}>DELETE</button>
                            {/* deletePost(idx) 인덱스를 써야하는데 map돌면서 받은idx를 써야함
                        </div>
                         */}

                    </article>
                    );

                })}
            </div>
        </Layout>
    );
}

