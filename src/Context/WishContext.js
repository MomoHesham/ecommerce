import axios from "axios";
import { createContext, useState } from "react";

export const WishContext = createContext()
export default function WishContextProvider(props) {
    const [wishColor, setWishColor] = useState([]);
    const headers = {
        token: localStorage.getItem('userToken'),
    }

    function addProductWish(id) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
            {
                productId: id
            },
            {
                headers
            }
        ).then(response => response).catch(error => error)
    }
    function getAllWishProduct() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
            {
                headers
            }
        ).then(response => response).catch(error => error)
    }
    function removeProductWish(id) {
        return (
            axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                {
                    headers
                }).then(response => response).catch(err=>err)
        )
    }
    return (
        <WishContext.Provider value={{ addProductWish, getAllWishProduct,  removeProductWish, wishColor ,setWishColor}}>
            {props.children}
        </WishContext.Provider>
    )
}