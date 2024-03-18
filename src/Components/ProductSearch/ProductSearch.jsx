import React, { useEffect, useState, useContext } from "react";
import ProductItem from "../ProductItem/ProductItem";
import { WishContext } from './../../Context/WishContext';

export default function ProductSearch({ getAllProduct }) {
  const { getAllWishProduct ,wishColor} = useContext(WishContext);
  const [getData, setGetData] = useState([]);
  const [inWishColor, setInWishColor] = useState(false);
  let searchedProduct=[];
  async function searchProduct() {
     searchedProduct = [];
    // console.log();
    let { data } = await getAllProduct();
   

    for (let x = 0; x < data.data.length; x++) {
      if (document.querySelector("#product-search").value != " ") {
        if (
          data.data[x].title
            .toLowerCase()
            .includes(
              document.querySelector("#product-search").value.toLowerCase()
            )
        ) {
          console.log(data.data[x]);
          console.log("yes");
          searchedProduct.push(data.data[x]);
          console.log("searchedProduct :: ", searchedProduct);
        }
      }
    }
    setGetData(searchedProduct);
  }
  async function getFirstData() {
    let { data } = await getAllProduct();
    setGetData(data.data);
  }
  async function wishData() {
    let x =  await getAllWishProduct()
    console.log("Wish Data :: ",x);
  }
  useEffect(() => {
    getFirstData();
    wishData();
  }, [])
  
  return (
    <div>
      <div className="mb-3 w-75 mx-auto">
        <input
          type="text"
          name=""
          id="product-search"
          className="form-control"
          placeholder="search..."
          aria-describedby="helpId"
          onInput={() => searchProduct()}
        />
      </div>
      {console.log(wishColor)}
      <div className="row gy-3 gx-2">
           {getData?.map((product) => (
              <ProductItem product={product} inWishColor={inWishColor} setIconWishColor={setInWishColor} />
            ))}
</div>
   
      
    </div>
  );
}
