import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../common/Layout';

function Signup() {
    const history = useHistory();
    /*
    useHistory  : url주소를 변경할 때 사용하는 hook이다.
    리액트 특성상 url변경없이 내부 커포넌트만 변경시켜 화면을 바꿔줄 수 있다. 
    하지만 url을 바꿔주면 현재 어느페이지에 있는지 사용자가 대략적으로 알수 있다
    url 주소 변경없이 컴포넌트의 변경만으로도 사용자가 웹 페이지를 이용할 수 있지만,
    복잡한 순서와 사용자 경험을 개선하기 위해 핵심컴포넌트 들이 변경될때 url을 같이 변경시켜주면 
    "사용자 친화적인 페이지"가 될수 있다.
    
    useHistory는 사용하기 위해 리액트라우터돔을 사용해야한다. 
    라우터의 버전이 5인경우가 useHistory이고 라우터 버전이 6인경우는 useNavigate로 써야함.
    */

    //입력값이 담길 초기 state를 객체로 지정 
    const initVal = {
        userid: '',
        email: '',
        pwd1: '',
        pwd2: '',
        comments:'',
        edu: '',
        gender: null,
        interests: null ,
    };

    //해당  initVal 객체값을 state에 초기값으로 저장 
    const [Val, setVal] = useState(initVal);
    const [Err, setErr] = useState({});
    const [Submit, setSubmit] = useState(false);

    const check = (value) => {
        const errs = {};

        const eng = /[a-zA-Z]/;
        const num = /[0-9]/;
        const spc = /[~!@#$%^&*()_+]/;



        if (value.userid.length < 5) {
            errs.userid = '아이디를 5글자 이상 입력하세요';  }
        // 8글자 이하거나 @가 없으면
        if (value.email.length < 8 || !/@/.test(Val.email) ){
            errs.email = '이메일은 8글자 이상, @를 포함하세요';   }
        if(value.pwd1 <5 || 
            !eng.test(value.pwd1) ||
            !num.test(value.pwd1) ||
            !spc.test(value.pwd1)
            )
            {errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하여 적어주세요';}
            //하나라도 참이면 에러메세지, 모두거짓이면 에러메세지 없이 통과
        if(value.pwd1 !== value.pwd2 || value.pwd2 < 5 ){
            errs.pwd2 = "두개의 비밀번호를 동일하게 입력하세요.";
        }
        //gender값이 존재하니?
        if(!Val.gender){
            errs.gender = "성별을 선택하세요.";
        }

        if(!Val.interests){
            errs.interests = '선택해주세요.';
        }
        
        if(Val.comments.length < 20){
            errs.comments = '남기는 말을 20글자 이상 입력하세요';
        }

        if(Val.edu === ''){
            errs.edu = '최종학력을 선택하세요';
        }

        return errs;
    };

    const handleChange = (e) => {
        //순서 2 - 입력하고 있는 인풋요소의 네임, 벨류값을 변수로 비구조화 할당
        const { name, value } = e.target;
        //순서 3 - 비구조화 할당으로 받은 값을 Val state에 저장하고 
        //순서 4 -setVal함수가 렌더링해서 우리가 볼 수 있도록 함
        setVal({ ...Val, [name]: value });
    }

    const handleRadio=(e)=>{
        const {name} = e.target;
        const isChecked= e.target.checked;
        setVal({...Val, [name]: isChecked});
    }

    const handleSelect=(e)=>{
        const {name} = e.target;
        const isSelected = e.target.value;
        setVal({...Val, [name]:isSelected});
    }

    const handleCheck=(e)=>{
        let isChecked = false;
        const {name} = e.target;
        const inputs = e.target.parentElement.querySelectorAll('input');
        //인풋에 반복을 돌린다.
        inputs.forEach((el)=>{
            if(el.checked) isChecked = true;
            });
            setVal({...Val, [name]: isChecked})
    }

    const handleReset = (e)=>{
        setSubmit(false);
        setErr({});
        setVal(initVal);
    }    
    
    const handleSubmit = (e) => {
        //순서 6 일단 서버전송은 막아준다
        e.preventDefault();
        //순서 7 Val state값을 인수로 전달해서 check함수에서 인증검사 시작 <={ check(Val)}
        setErr(check(Val));
        //순서 8 인증검사 결과 errs가 존재한다면 반환된 에러 객체를 Err state에 옮겨 담음
    };

    useEffect(()=>{
        const len = Object.keys(Err).length;
        if(len === 0 && Submit){
            alert('회원가입이 완료되었습니다. 메인페이지로 이동합니다.');
            history.push('/youtube')
        }
    },[Err]);


    return (
        <Layout name={'Member'}>
            {/* 순서 5 전송버튼 클릭시 핸들서브밋함수를 호출 */}
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend className='h'>회원가입 폼 양식</legend>
                    <table border='1'>
                        <caption className='h'>회원가입 정보입력</caption>
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

                                        value={Val.userid}
                                        //순서1 - 인풋에 값을 입력시 핸들체인지 함수가 호출
                                        onChange= { handleChange }
                                    />
                                    {/* 순서 9 만약 에러객체가 있다면 화면에 출력 */}
                                    <span className='err'>{Err.userid}</span>
                                </td>
                            </tr>

                            {/* password */}
                            <tr>
                                <th scope='row'>
                                    <label htmlFor="pwd1">PASSWORD</label>
                                </th>
                                <td>
                                    <input type="password" name="pwd1" id="pwd1" placeholder='패스워드를 입력하세요' onChange={handleChange} />
                                    <span className='err'>{Err.pwd1}</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>
                                    <label htmlFor="pwd2">RE-PASSWORD</label>
                                </th>
                                <td>
                                    <input type="password" name="pwd2" id="pwd2" placeholder='패스워드를 재입력하세요' onChange={handleChange} />
                                    <span className='err'>{Err.pwd2}</span>
                                </td>
                            </tr>

                            {/* email */}
                            <tr>
                                <th scope='row'>
                                    <label htmlFor="email">E-MAIL</label>
                                </th>
                                <td>
                                    <input type="text"
                                            id='email'
                                            name='email'
                                            placeholder='이메일 주소를 입력하세요.'
                                            value={Val.email}
                                            onChange={handleChange}
                                    />
                                    <span className='err'>{Err.email}</span>
                                </td>
                            </tr>
                            {/* edu */}
                            <tr>
                                <th scope='row'>
                                    <label htmlFor="edu">EDUCATION</label>
                                </th>
                                <td>
                                    <select name="edu" id="edu" onChange={handleSelect}>
                                        <option value="">학력을 선택하세요</option>
                                        <option value="elementary">초등학교졸업</option>
                                        <option value="middle">중학교졸업</option>
                                        <option value="high">고등학교졸업</option>
                                        <option value="college">대학교졸업</option>
                                    </select>
                                    <span className='err'>{Err.due}</span>
                                </td>
                            </tr>

                            {/* gender */}
                            <tr>
                                <th scope='row'>GENDER</th>
                                <td>
                                    <label htmlFor="male">MALE</label>
                                    <input type="radio" name="gender" id="male" onChange={handleRadio}/>
                                    
                                    <label htmlFor="female">FEMALE</label>
                                    <input type="radio" name="gender" id="female" onChange={handleRadio} />
                                    
                                    <span className='err'>{Err.gender}</span>
                                </td>
                            </tr>

                            {/* check box */}
                            <tr>
                                <th scope='row'>INTEREST</th>
                                <td>
                                    <label htmlFor="sports">SPORTS</label>
                                    <input type="checkbox" name="interests" id="sports" onChange={handleCheck}/>

                                    <label htmlFor="music">MUSIC</label>
                                    <input type="checkbox" name="interests" id="music" onChange={handleCheck}/>

                                    <label htmlFor="game">GAME</label>
                                    <input type="checkbox" name="interests" id="game" onChange={handleCheck}/>
                                    <span className='err'>{Err.interests}</span>
                                </td>
                            </tr>

                            {/* comments */}
                            <tr>
                                <th scope='row'>
                                    <label htmlFor="comments">COMMENSTS</label>
                                </th>
                                <td>
                                    <textarea name="comments" id="comments" cols="30" rows="5" value={Val.comments} onChange={handleChange} ></textarea>
                                    <span className='err'>{Err.comments}</span>    
                                </td>

                            </tr>
                


                            {/* btn set */}
                            <tr>
                                <th colSpan='2'>
                                    <input type="reset" value="CANCLE" onClick={handleReset}/>
                                    <input type="submit" value="SEND" onClick={()=>setSubmit(true)}/>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </fieldset>

            </form>
        </Layout>

    );
}
export default Signup;
