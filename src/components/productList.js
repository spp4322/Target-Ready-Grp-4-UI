import ProductListItem from "./productListItem";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const products = [
        {
            id: 1,
            productName: 'Shampoo',
            productPrice: 448
        },
        {
            id: 2,
            productName: 'Perfume',
            productPrice: 880
        },
        {
            id: 3,
            productName: 'Towel',
            productPrice: 670
        }
    ];

    const navigate = useNavigate()
    function placeOrder(id) {
        //console.log(id);
        navigate('/create-order', {state: {id: id}, replace: false});
        
    }

    const productJsx = products.map((p) => (<ProductListItem key={p.id} product={p} placeOrder={(id) => placeOrder(id) } />));

    return (<>
        <ul className='list-group'>{productJsx}</ul>
    </>
    );
}

export default ProductList;