import React, { useEffect, useState } from "react";
import  ProductCard from "./ProductCard";
import styles from "./ProductList.module.css"

const ProductList = () =>{
    const [ products, setProducts ] = useState([]);
    const [ selectedCategory, setSelectedCategory] = useState([]);
    const [ currentPage,  setCurrentPage ] = useState(1);
    const [ sortDirection , setsortDirection] = useState('asc')
    const [ sortedProducts , setSortedProducts] = useState(products);

    const categories = [ ...new Set(products.map((product) => product.category))];
    const limit = 30;
    const handleCategorySelect = (event) => {
        setSelectedCategory(event.target.value);
    }
    const handleSort =() =>{
      const direction = sortDirection === 'asc' ? 'desc ' : 'asc'
      setsortDirection(direction);

      const sorted = products.slice().sort((a,b)=> {
        if (direction === 'asc') {
          return a.price - b.price;

        } else {
          return b.price - a.price ;

        }
      })

      setSortedProducts(sorted);
    }



    const fetchMoreProducts = async (limit, currentPage) => {
        try {
         setCurrentPage(currentPage + 1);
          if (currentPage > 3) {
            alert('No more products to load');
            return;
          }
          const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${currentPage * limit}`);
          const data = await response.json();
          setProducts([...products, ...data.products]);
          setSortedProducts([...sortedProducts, ...data.products]);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

     useEffect (()  => {
        fetch('https://dummyjson.com/products')
    .then((response)=> response.json())
    .then((data) => {
        setProducts(data.products);
        setSortedProducts(data.products);
        console.log(data.products);
    })
    .catch((error) => {
        console.error('Error fetching products :', error);

    })      
}, []);

    return(
    <div className={styles.ListWrapper}>
        <div className={styles.controlsWrapper}>
        <label htmlFor='category'>Filter by category:</label>
        <select
          id='category'
          className={styles.inputField}
           value={selectedCategory}
          onChange={handleCategorySelect}
        >
          <option value=''>All</option>
          { categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
           ))
          }
        </select>
          <label> Sort by Price:</label>
          <button onClick={handleSort}
          className={styles.sortbtn}>

            { sortDirection === 'asc' ? 'Low to High' : 'High to Low'}

          </button>

      </div>

          <div className={styles.cardsWrapper }>
        { sortedProducts
            .filter((product) => selectedCategory ==  '' || product.category === selectedCategory )
            .map((product) => 
            <ProductCard key ={ product.id} product = {product} />
         )}
         </div>

            <button className={styles.actionBtn}
            onClick={() => fetchMoreProducts(limit , currentPage) }
            disabled = {currentPage > 3 }
            >
                    Load More.....
            </button>
    </div>
);
    }
export default ProductList