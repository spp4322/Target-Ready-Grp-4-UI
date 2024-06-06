import { useNavigate } from "react-router-dom";

const QuantAlert = () => {
    const navigate = useNavigate();

    const submitHandler = () => {
        navigate('/', {replace: true});
    }
    
    return (<>
        <div className="container mt-5">
            <div className="alert alert-primary">
                <h3>Sorry! Out of Stock.</h3>
            </div>
            <button className="mt-3" onClick={() => submitHandler()}>OK</button>
        </div>
    </>);
};

export default QuantAlert;