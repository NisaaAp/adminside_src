import React from "react";
import Navbar from '../component/navbar';
import axios from "axios";
import "../style/home.css"
import TransaksiList from "../component/transactionsList";




export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            transactions: [],
            products: [],
            isModalOpen: false,
            selectedItem: null
            // action: ""
        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getTransaction = () => {
        let url = "http://localhost:8080/transaksi"

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    transactions: res.data.transaksi,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
            
    }
    // getAmount = (products) => {
    //     let total = 0
    //     products.map(item =>{
    //         total += Number(item.price) * Number(item.qty)
    //     })
    //     return total
    // }

    
    componentDidMount() {
        this.getTransaction()
    }




    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-light mt-2">Transactions List</h3>

                    <div className="row">
                        {this.state.transactions.map((item, index) => {
                            return (
                                <TransaksiList
                                    key={item.transaksi_id}
                                    transaction_id={item.transaksi_id}
                                    customer_name={item.customer.name}
                                    customer_address={item.customer.address}

                                    time={item.waktu}
                                    products={item.detail_transaksi}
                                />
                            )
                        })}
                    </div>




                   
                </div>
            </div>
        )
    }
}