import React from 'react';

function Home() {  
    return(
        <>
            <h1>Welcome Home</h1>
            <h3> All endpoints in app</h3>
            <p>products/:category</p>
            <p>orders/all/:status</p>
            <p>customers:id</p>
            <p>orders/single/:id</p>
        </>
    );
}

export default Home;