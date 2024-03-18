import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext();
export default function CartContextProvider(props) {
    const [getCartCount, setGetCartCount] = useState(0)
    const [error, setError] = useState(null)
    const headers = {
        token: localStorage.getItem('userToken'),
    }
    function addProductToCart(id) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {
                productId: id
            },
            {
                headers
            }
        ).then(response => response).catch(error => error)
    }
    function getProductCart() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers }).then(response => response).catch(err => setError(err))
    }
    function updateProductCart(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                count
            },
            {
                headers
            }
        ).then(response => response).catch(error => error)
    }

    function removeProductCart(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers }).then(response => response).catch(error => error)

    }
    function removeAllCart() {
        return axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers }).then(response => response).catch(error => error)

    }
    async function initialCount() {
        let { data } = await getProductCart();
        if (data?.numOfCartItems) {
            setGetCartCount(data.numOfCartItems)
        } else {
            setGetCartCount(0)
        }

    }
    function checkOutPayment(id, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, {

            shippingAddress

        }, { headers })
    }
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            // initialCount()
        }

    }, [])

    return (
        <CartContext.Provider value={{ addProductToCart, getProductCart, updateProductCart, removeProductCart, removeAllCart, getCartCount, setGetCartCount, checkOutPayment, setError, error }}>
            {props.children}
        </CartContext.Provider>
    )
}