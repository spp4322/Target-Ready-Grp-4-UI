import { myAxios } from "../services/helper";
import ProductListItem from "./productListItem";
import { useNavigate } from "react-router-dom";

const ProductList = ({products}) => {

    const response = myAxios.get('/api/v1/target/order/1').then((response) => response.data);
    console.log(response);

    const listOfProduct = products;
    
    const navigate = useNavigate()
    function placeOrder(id) {
        //console.log(id);
        navigate('/create-order', {state: {id: id}, replace: false});
        
    }

    const productJsx = listOfProduct.map((p) => (<ProductListItem key={p.id} product={p} placeOrder={(id) => placeOrder(id) } />));

    return (<>
        <ul className='list-group'>{productJsx}</ul>
    </>
    );
}

export default ProductList;