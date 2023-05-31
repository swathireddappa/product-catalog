import React, { useEffect, useState } from "react";


 export const ProductList = () =>{
    const [ products, setProducts ] = useState([]);


useEffect (()  => {
    fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((data) => {
        setProducts(data.products);
        console.log(data.products);
    })
    .catch((error) => {
        console.error('Error fetching products :', error);

    });
}, []);

return(
    <div>
        <h1>Product List</h1>
    </div>

);
}  


