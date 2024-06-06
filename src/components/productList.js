import { myAxios } from "../services/helper";
import Header from "./header";
import ProductListItem from "./productListItem";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, addCartItem, cartList }) => {

    // const response = myAxios.get('/api/v1/target/allProducts').then((response) => response.data);
    // console.log(response);

    const listOfProduct = products;

    const navigate = useNavigate()
    function addToCart(id) {
        //console.log(id);
        //navigate('/create-order', {state: {id: id}, replace: false});

        addCartItem(id);
        console.log(cartList);
    }

    const productJsx = products.map((p) => (<ProductListItem key={p.id} product={p} addToCart={(id) => addToCart(id)} />));

    return (<>
        <div >
            <Header className='col-md-12'/>
            <ul className='list-group col-md-12 container'>{productJsx}</ul></div>
    </>
    );
}

export default ProductList;