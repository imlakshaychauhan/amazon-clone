import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import './Orders.css'
import { Link } from 'react-router-dom'
import { useStateValue } from "./StateProvider";
import Order from './Order'

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(user) {
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    } else {
        setOrders([])
    }

  }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
            <div className="orders__button" ><Link to="/">
             <button  > 
             Shop More</button>
             </Link>
            </div>
        </div>
    )
}

export default Orders
