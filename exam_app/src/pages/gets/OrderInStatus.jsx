import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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


function OrderInStatus() {
  const { status } = useParams();
  const [orders, setorders] = useState([])
  
  useEffect(() => {
    if (orders == 0){
      fetch(`http://127.0.0.1:8000/api/order/?status=${status}`)
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
      {displayOrders()}
    </div>
  );
}

export default OrderInStatus;