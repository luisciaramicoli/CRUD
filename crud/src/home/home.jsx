import NavBar from "../components/nav/home";
import Tables from "../components/tables/tables";

import './home.css';

function Home() {
    return (
       <div>
        <NavBar />
        <div className="tabela">
                <Tables />
        </div>
              
       </div>
    );
}

export default Home;