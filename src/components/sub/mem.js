import { useState } from 'react';
import Layout from '../common/Layout';

function Member() {

    //userid의 입력값이 담길 초기 state를 객체로 지정 +email + 비밀번호 +계쏙 추가할예정 1
    const initVal = {
        userid : '',
    };

    //해당  initVal 객체값을 state에 초기값으로 저장 2 (1이 2로옴)
    const [Val, setVal] = useState(initVal);

    const [Err, setErr] = useState({});

    const check = (value)=>{
        const errs = {};

        if(value.userid.legnth < 5){
            errs.userid = '아이디를 다섯글자이상 입력하세요.';
        }
        return errs;
    };

    /*
    대입형 함수의 특징: 함수 표현식이라고 하는데 이 함수의 특징은 호이스팅에 영향을 받지 않는다.
    콜백으로 사용가능 (다른 함수의 인자로 넘길수 있음, 순서에 따라서 적용됨)
    원래 자바스크립트는 순서형이 아니라 왓다갓다거릴수있으나 대입형은 순서에 따라~
    클로저로 사용가능 - 클로저는 매우 어렵지만 자바 스크립트의 중요개념
    클로저란 함수 자신이 만들어지 ㄴ환경 (scope)를 기억해서 외부에서 호출되거나, 상위함수가 종료되더라도 해당 환경을 기억해서 접근할 수 있는 함수를 말한다.
    즉, 메모리상에서 환경을 기억한다는 점에서 메모리를 점유하고있어 메모리상으로는 손해,
    하지만, 자바스크립트의 강력한 기능으로 적극적으로 사용된다.

     */

    //대입형함수, 특별한 경우라서 사용
    //순서2 입력하고 있는 인풋요소의 네임, 밸류 값을 변수로 비구조화 할당
    const handleChange = (e) => {
        const { name, value } = e.target;
        //[name] === userid, 객체의 키값
        //ec5에서는 객체키값변수지정 안됨, ec6에서는 객체의 키값을 변수로 치환가능 대신[변수] 이렇게 []로 감싸야함.

        setVal({ ...Val, [name]: value });
        //순서3 비구조화 할당으로 받은 값을 val state에 저장하고 , setVal함수가 렌더링해서 우리가 볼수 있도록 함.
        //=setVal({...Val, userid: e.target.value});
        //val(원래값) +userid: e.target.value(현재입력중인 인풋요소)
        }

        //순서 5 일단 서버전송, 이동을 막기 / a태그가 아니어도 submit자체가 가지는 속성을 막는다.
        const handleSubmit=(e)=>{
            e.preventDefault();
            setErr(check(Val));
            //check함수에 인수로 Val값을 넣어서 
            //순서6 Val state값을 인수로 전달해서 check함수에서 인증검사시작 <=check(Val)
            //순서 7 인증검사 경과 errs가 존재한다면 반환된 에러객체를  err state에 옮겨 담음
        };

        

    return (
        <Layout name={'Member'}>
            {/* 순서 4 전송버튼클릭시 핸들서브밋함수 호출 */}
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>회원가입 폼 양식</legend>
                    <table border='1'>
                        <caption>회원가입 정보입력</caption>
                        <tbody>
                            {/* userid */}
                            <tr>
                                <th scope='row'>
                                    <label htmlFor="userid">USER ID</label>
                                </th>
                                <td>
                                    <input type="text"
                                            placeholder='아이디를 입력하세요'
                                            name='userid'
                                            id='userid'
                                            //VAl state에 있는 userid값을 input 요소에 출력 3(2가3으로옴)
                                            value={Val.userid} //
                                            //input에 value값쓰면 onChange라는 이벤트발생
                                            //순서1-인풋에 값을 입력시 핸들체인지 함수가 호출
                                            onChange={(e)=>{handleChange}}
                                    />
                                    {/* 순서 8 에러객체가 있으면 Err정보값을 화면에 출력 */}
                                    <span className='err'>{Err.userid}</span>
                                </td>
                            </tr>

                            {/* btn set */}
                            <tr>
                                <th colSpan='2'>
                                    <input type="reset" value="" />
                                    <input type="submit" value="" />
                                </th>
                            </tr>
                        </tbody>

                    </table>
                </fieldset>

            </form>
        </Layout>

    );
}
export default Member;