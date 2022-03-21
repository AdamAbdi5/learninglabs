import { useMutation } from "urql"

const H1 = `
    mutation{
        h1
    }
`

export default function B1(){
    const [updateH1Result, updateh1] = useMutation(H1)

    const clickHandler = () =>{
        
        updateh1().then(result =>{
            console.log(result.data)
        })
    }

    return (
        <button onClick={clickHandler}>Click</button>
    );
}