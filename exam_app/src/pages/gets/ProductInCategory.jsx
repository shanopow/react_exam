import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const drawProduct = (jsl) => {
  return (
    <article>
      <header>{jsl.url}</header>
      <p>Name: {jsl.name}</p>
      <p>Price: {jsl.price}</p>
      <p>Category: {jsl.category}</p>
    </article>
  )
};


function ProductInCategory() {
  const { category } = useParams();
  const [products, setproducts] = useState([])
  
  useEffect(() => {
    if (products == 0){
      fetch(`http://127.0.0.1:8000/api/product/?category=${category}`)
      .then(response => response.json())
      .then(data => {
        setproducts(data)
      })
      .catch(error => console.log(error));
    }
  });
  
  const displayProducts = () => {
    return products.map(element => <div>{drawProduct(element)}</div>);
  };
  
  return (
    <div>
      {displayProducts()}
    </div>
  );
}

export default ProductInCategory;