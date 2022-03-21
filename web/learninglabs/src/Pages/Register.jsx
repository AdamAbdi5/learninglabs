import { useState } from "react"
import { useMutation } from "urql";

const CREATE_STUDENT = `
    mutation ($first_name: String!, $last_name: String!, $password: String!, $classes: [String!]!){
        createStudent(first_name: $first_name, last_name: $last_name, password: $password, classes: $classes){
            id
            first_name
            last_name
            password
            classes
        }
    }
`

export default function Register(){
    const [f_name, setf_name] = useState("");
    const [s_name, sets_name] = useState("");
    const [pass, setpass] = useState("");
    const [classes, setclasses] = useState("");

    const [_, updateRegister] = useMutation(CREATE_STUDENT)

    const f_nameHandler = (e) =>{
        setf_name(e.target.value)
    }

    const s_nameHandler = (e) => {
        sets_name(e.target.value)
    }

    const passHandler = (e) =>{
        setpass(e.target.value)
    }

    const classHandler = (e) =>{
        setclasses(e.target.value)
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        const classList = classes.split(" ");

        const variables = {"first_name": f_name, "last_name": s_name, "password": pass, "classes": classList}
        updateRegister(variables).then(result =>{
            if (result.error){
                return result.error;
            }
            console.log(result)
        })

        
    }


    return (
        <>
            <form onSubmit={submitHandler}>
                <label>First Name</label>
                <input type="text" value={f_name} onChange={f_nameHandler}></input>
                <label>Second Name</label>
                <input type="text" value={s_name} onChange={s_nameHandler}/>
                <label>Password</label>
                <input type="password" value={pass} onChange={passHandler}/>
                <label>Classes</label>
                <input type="classes" value={classes} onChange={classHandler}></input>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}