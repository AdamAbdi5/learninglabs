import "./Home.css"
import {useNavigate} from "react-router-dom"

export default function Home(){

    const navigate = useNavigate();

    return (
        <>  
            <header>
            
                <nav>
                    <ul>
                        <li className="buttons"><button onClick={() => {
                            navigate("/teacherlogin")
                        }}className="teacher">Teacher</button></li>
                        <li className="buttons"><button onClick={() =>{
                            navigate("/studentlogin")
                        }} className="student">Student</button></li>
                    </ul>
                    
                    
                </nav>
            </header>

            <section className="first-section">
                <div clasName="heading-div"><h1 className="main-heading">Build your own future</h1></div>
                
            </section>
        
           
        </>
    );
}