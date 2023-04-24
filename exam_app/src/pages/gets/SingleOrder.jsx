import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleOrder() {
  const { id } = useParams();
  const [ tot_price, addprice ] = useState(0)
  const [items, setitems] = useState([])
  const [order, setorder] = useState([])
  const [newitems, setnewitems] = useState([])
  
  useEffect(() => {
    if (order == 0){
        fetch(`http://127.0.0.1:8000/api/order/${id}`)
        .then(response => response.json())
        .then(data => {
          setorder(data)
        })
        .catch(error => console.log(error));
      }
    
    if (items == 0){
      fetch(`http://127.0.0.1:8000/api/orderitem/?order=${id}`)
      .then(response => response.json())
      .then(data => {
        setitems(data)
        data.map(element => {ItemMaker(element)});
      })
      .catch(error => console.log(error));
    }
  });

  const displayItems = () => {
    return newitems.map(element => <div>{drawItem(element)}</div>);
  };

  const drawItem = (jsl) => {
    return (
      <article>
        <header>{jsl.url}</header>
        <p>Name: {jsl.name}</p>
        <p>Price: {jsl.price}</p>
        <p>Category: {jsl.category}</p>
      </article>
    )
  };

  const displayProducts = () => {
    return items.map(element => <div>{drawProduct(element)}</div>);
  };

  const drawProduct = (jsl) => {
    return (
      <article>
        <header>{jsl.url}</header>
        <p>Quantity: {jsl.quantity}</p>
        <p>Product: {jsl.product}</p>
        <p>Order: {jsl.order}</p>
      </article>
    )
  };

  const ItemMaker = async(jsl) => {
    console.log(tot_price)
    const resp = await fetch(`${jsl.product}`);
    const newdata = await resp.json();
    setnewitems((newitems) => ([...newitems, newdata]));
    addprice(tot_price + parseFloat(newdata.price));
  };

  const drawOrder = (jsl) => {
    return (
      <article>
        <header>{jsl.url}</header>
        <p>Date Ordered: {jsl.date_ordered}</p>
        <p>Shipping: {jsl.shipping_adr}</p>
        <p>Status: {jsl.status}</p>
        <p>Customer: {jsl.customer}</p>
      </article>
    )
  };

  return (
    <div>
      <h1> Order</h1>
      {drawOrder(order)}
      <h1> Items </h1>
      <p>Total Price: {tot_price} (Price does go up but gets reset each time, oops)</p>
      {displayItems()}
      <h1>Product Items</h1>
      {displayProducts()}
    </div>
  );
}

export default SingleOrder;