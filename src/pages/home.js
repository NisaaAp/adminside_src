import axios from 'axios';
import React from 'react';
import "../style/home.css"
import Navbar from '../component/navbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import PaidIcon from '@mui/icons-material/Paid';
// import NavbarLa from '../component/navbarlagi';

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",//untuk akses endpoint
            adminName: "",//menampilkan nama admin yang login
            adminCount: 0,
            custName: "",
            custCount: 0,
            prodName: "",
            prodCount: 0,
            tranName: "",
            tranCount: 0

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
            headers: {Authorization : `Bearer ${this.state.token}`}
        }
        return header
    }
    getAdmin = () => {
        let admin = (localStorage.getItem("name"))//json parse karna data yang dibutuhkan string
        // let admin = JSON.parse(localStorage.getItem("username"))//json parse karna data yang dibutuhkan string
        let url = "http://localhost:8080/store/admin"

        axios.get(url)
            .then(res => {
                this.setState({
                    adminName: admin,
                    adminCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(admin)
        console.log(this.state.adminCount)

    }

    getAllCust = () => {
        let customer = (localStorage.getItem("name"))
        let url = "http://localhost:8080/customer"
        axios.get(url)
            .then(res => {
                this.setState({
                    custName: customer,
                    custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(customer)
        console.log(this.state.custCount)
    }
    getAllProd = () => {
        let product = (localStorage.getItem("name"))
        let url = "http://localhost:8080/product"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    prodName: product,
                    prodCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(product)
        console.log(this.state.prodCount)
    }
    getAllTran = () => {
        let tran = (localStorage.getItem("name"))
        let url = "http://localhost:8080/transaksi"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    tranName: tran,
                    tranCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(tran)
        console.log(this.state.tranCount)
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getAdmin()
        this.getAllCust()
        this.getAllProd()
        this.getAllTran()
    }
    render() {
        return (
            <div className='back'>
                {/* <NavbarLa /> */}
            <Navbar />
            <div className='container'>
                {/* <div className='alert alert-success '> */}

                <div className='text-center mt-5 mb-5'>
                    {/* <h1>Ini Halama Home</h1> */}
                    <h3>Selamat datang {this.state.adminName}</h3>
                </div>
                <div className='d-flex justify-content-around my-3'>
                    <div className="card col-6 m-1 me-2">
                        <div className="card-body row ">
                            {/* menampilkan gambar*/}
                            <div className="col-5">
                                <AccountCircleIcon sx={{ fontSize: 130 }} />
                                {/* <img src={"https://drive.google.com/uc?id=1Pf0WGAiisaCXwh_eR_mxhTjDpHnri9-8"} className="img" height="200" alt="book"/> */}

                            </div>
                            <div className="col-7 rounded-3 ">
                                <h5 className="text-dark fs-3 py-2">
                                    Total Admin
                                </h5>
                                <h6 className="text-dark fs-2">
                                    {this.state.adminCount}
                                </h6>
                            </div>

                        </div>
                    </div><br />
                    <div className="card col-6 m-1">
                        <div className="card-body row ">
                            {/* menampilkan gambar*/}
                            <div className="col-5">
                                <PeopleAltTwoToneIcon sx={{ fontSize: 140 }} />
                                {/* <img src={"https://drive.google.com/uc?id=1Pf0WGAiisaCXwh_eR_mxhTjDpHnri9-8"} className="img" height="200" alt="book"/> */}
                            </div>
                            <div className="col-7 rounded-3 ">
                                <h5 className="text-dark fs-1 py-2">
                                    Total Customer
                                </h5>
                                <h6 className="text-dark fs-2">
                                    {this.state.custCount}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-around'>
                    <div className="card col-6 m-1 me-2">
                        <div className="card-body row ">
                            {/* menampilkan gambar*/}
                            <div className="col-5">
                                <PeopleAltTwoToneIcon sx={{ fontSize: 140 }} />
                                {/* <img src={"https://drive.google.com/uc?id=1Pf0WGAiisaCXwh_eR_mxhTjDpHnri9-8"} className="img" height="200" alt="book"/> */}

                            </div>
                            <div className="col-7 rounded-3 ">
                                <h5 className="text-dark fs-1 py-2">
                                    Total Produk
                                </h5>
                                <h6 className="text-dark fs-2">
                                    {this.state.prodCount}
                                </h6>
                            </div>

                        </div>
                    </div>
                    <div className="card col-6 m-1">
                        <div className="card-body row ">
                            {/* menampilkan gambar*/}
                            <div className="col-5">
                                <PaidIcon sx={{ fontSize: 140 }} />
                                {/* <img src={"https://drive.google.com/uc?id=1Pf0WGAiisaCXwh_eR_mxhTjDpHnri9-8"} className="img" height="200" alt="book"/> */}

                            </div>
                            <div className="col-7 rounded-3 ">
                                <h5 className="text-dark fs-1 py-2">
                                    Total Transaksi
                                </h5>
                                <h6 className="text-dark fs-2">
                                    {this.state.tranCount}
                                </h6>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}