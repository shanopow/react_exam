import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const drawCustomer = (jsl) => {
  return (
    <article>
      <header>{jsl.url}</header>
      <p>Name: {jsl.name}</p>
      <p>Email: {jsl.email}</p>
      <p>Address: {jsl.address}</p>
    </article>
  )
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


function SingleCustomer() {
  const { id } = useParams();
  const [customer, setcustomer] = useState([])
  const [orders, setorders] = useState([])
  
  useEffect(() => {
    if (customer == 0){
      fetch(`http://127.0.0.1:8000/api/customer/${id}`)
      .then(response => response.json())
      .then(data => {
        setcustomer(data)
      })
      .catch(error => console.log(error));
    }

    if (orders == 0){
        fetch(`http://127.0.0.1:8000/api/order/?customer=${id}`)
        .then(response => response.json())
        .then(data => {
          setorders(data)
        })
        .catch(error => console.log(error));
      }
  });
  
  const displayOrders = () => {
    return orders.map(element => <div>{drawOrder(element)}</div>);
  };


  return (
    <div>
      {drawCustomer(customer)}
      <h1> Orders</h1>
      {displayOrders(orders)}
    </div>
  );
}

export default SingleCustomer;