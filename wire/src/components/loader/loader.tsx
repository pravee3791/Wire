import { BiLoaderCircle } from "react-icons/bi";
import "./loader.css";
function Loader() {
    const loaderArray = new Array(1).fill(0);
    return (
        <>
            <div className='container'>
                <div id="loading-spinner">
                    <div className="spin-icon"></div>
                </div>
            </div>
        </>

    )
}

export default Loader;