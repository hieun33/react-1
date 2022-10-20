import { useState } from 'react';
import Layout from '../common/Layout';

export default function Member(){

    const initVal ={
        userid : '',
        email : ''
    };

    const [Val, setVal] = useState(initVal);
    const [Err, setErr] = useState({});

    const check = (value)=>{
        const errs = {};

        if(value.userid.length <5){
            errs.userid = '아이디를 다섯글자이상 입력하세요.';
        }
        
        return errs;
    };
    const handleChange = (e)=>{
        const {name, value} =e.target;
        setVal({...Val,[name]:value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setErr(check(Val));
    }

    return(
        <Layout name={'Member'}>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>회원가입 폼 양식</legend>
                    <table border='1'>
                        <caption>회원가입 정보입력</caption>
                        <tbody>
                            <tr>
                                <th scope='row'>
                                    <label htmlFor="userid">USER ID</label>
                                </th>
                            </tr>
                        </tbody>

                    </table>
                </fieldset>
            </form>

        </Layout>
    );
}