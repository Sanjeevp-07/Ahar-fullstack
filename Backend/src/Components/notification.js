import { useEffect, useState } from "react";
import socket from "../socket";

function Notifications() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/donations")
            .then((res) => res.json())
            .then((data) => setOrders(data));

        socket.on("orderUpdated", ({ donationId, status }) => {
            setOrders((prevOrders) => prevOrders.filter(order => order.id !== donationId));
        });

        return () => {
            socket.off("orderUpdated");
        };
    }, []);

    return (
        <div>
            {orders.map(order => (
                <div key={order.id}>
                    <h3>{order.restaurant_name}</h3>
                    <p>{order.food_type} - {order.quantity}</p>
                    <p>Status: {order.status}</p>
                </div>
            ))}
        </div>
    );
}

export default Notifications;