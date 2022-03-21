import {useState} from "react"
import { useMutation } from "urql"
import {getAccessToken, setAccessToken} from "../accessToken.js"
const STUDENT_LOGIN = `
    mutation ($first_name: String!, $last_name:String!, $password: String!){
        studentLogin (first_name: $first_name, last_name: $last_name, password: $password){
            accessToken
        }
    }
`

export default function Student(){
    
    const [updateStudentResult, updateStudent] = useMutation(STUDENT_LOGIN)
    

    const [f_name, setf_name] = useState("");

    const f_namehandler = (e) =>{
        setf_name(e.target.value)
    };

    const [l_name, setl_name] = useState("");

    const l_namehandler = (e) =>{
        setl_name(e.target.value)
    }

    const [password, setpass] = useState("");

    const passwordhandler = (e) =>{
        setpass(e.target.value)
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const variables = {"first_name" :f_name, "last_name" : l_name, "password" : password}
        updateStudent(variables).then(result =>{
            if (result.error){
                return result.error;
                
            }
            if (result && result.data){
                
                setAccessToken(result.data.studentLogin.accessToken)
                

            }
        })

    }

    return (
        <>
            <form onSubmit={formSubmit}>
                <label>First Name</label>
                <input value={f_name} onChange={f_namehandler} type="text"/>
                <label>Last Name</label>
                <input value={l_name} onChange={l_namehandler} type="text"/>
                <label>Password</label>
                <input value={password} onChange={passwordhandler} type="password"/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
