import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price* product.quantity;
    }
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 0) {
        shipping = 12.99;
    }
    else if (total > 20) {
        shipping = 5.88;
    }
    const tax = (total / 8).toFixed(2)
    const grandTotal = total + shipping + parseFloat(tax);
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }



    return (
        <div className='cart-container'>
            <h1>Order Summary</h1>
            <h3>items ordered: {cart.length}</h3>
            <p>Product price: {formatNumber(total)} </p>
            <p><small>shipping cost: {shipping} </small></p>
            <p><small>tax(8%): {tax}</small></p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
          <br/>
          {
              props.children
          }
        </div>
    );
};

export default Cart;