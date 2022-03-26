import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import '../index.css';

class Cart extends React.Component {
    constructor(){
        super()
        this.state = {
        cart: [], // untuk menyimpan list cart
        user: "", // untuk menyimpan data nama user
        total: 0, // untuk menyimpan data total belanja
        }
    }

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
        tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        // memanggil data user pada localStorage
        let userName = localStorage.getItem("user")
        // kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
        totalHarga += (item.harga * item.jumlahBeli)
        })
        // memasukkan data cart, user, dan total harga pada state
        this.setState({
        cart: tempCart,
        user: userName,
        total: totalHarga
        })
    }

    componentDidMount(){
        this.initCart()
    }


    render(){
        return(
        <div className="container">
            <div className="col-md-8 col-lg-12 order-md-last"><br></br><br></br>
                <h4 className="d-flex justify-content-between align-items-center mb-4">
                    <span className="display-6">Order summary { this.state.user }</span>
                            <span className="badge bg-dark rounded-pill">3</span>
                        </h4>
                        <ul className="list-group ">
                        { this.state.cart.map( (item, index) =>
                            (
                            <li className="list-group-item d-flex justify-content-between">{item.judul}<br></br>
                                {item.jumlahBeli} x Rp {item.harga} <p className='subTotal'>Rp { item.harga * item.jumlahBeli }</p></li>
                                ) ) }
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total</span>Rp. {this.state.total} 
                            </li>
                        </ul>
                    <br></br>
                <NavLink to='/gallery' className="btn btn-dark btn-lg w-100" type="submit">Back Shopping</NavLink>
            </div>
        </div>
        )
        }
}

export default Cart;
