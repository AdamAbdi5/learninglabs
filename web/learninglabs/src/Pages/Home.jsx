import "../App.sass"
export default function Home(){


    return (
        <>
            <nav className="navbar is-dark">
                <div navbar-brand>
                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                        <button>Student</button>
                        <button>Teacher</button>
                    </a>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <button className="button is-light is-outlined ">
                                Student
                            </button>
                        </div>
                        <div className="navbar-item">
                            <button className="button is-dark is-inverted ">
                                Teacher
                            </button>
                        </div>
                        
                    </div>
                </div>
            </nav>
        </>
    );
}