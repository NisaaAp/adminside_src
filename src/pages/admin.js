import React from "react";
import Navbar from '../component/navbar';
import axios from "axios";
// import AdminList from "../component/admin_list";
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            admins: [],
            admin_id: "",
            name: "",
            username: "",
            password: "",
            isModalOpen: false,
            action: ""
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
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }
    getAdmin = () => {

        // let tempAdmin =[]
        // let name = ""
        // let username=""
        // let password = ""
        // if (localStorage.getItem("admin") !== null){
        //   tempAdmin = JSON.parse(localStorage.getItem("admin"))
        // }
        // tempAdmin.map(item => {
        //     name=(item.name)
        //     username= (item.username)
        //     password=(item.password)
        //   //2 cara
        //   //totalHarga = totalHarga + (item.harga * item.jumlahBeli)
        // //   totalHarga += (item.harga * item.jumlahBeli)
        // })
        // this.setState({
        //   admins: tempAdmin
          
        // })
        let admin = (localStorage.getItem("name"))
        let url = "http://localhost:8080/store/admin"
        axios.get(url,this.headerConfig())
            .then(res => {
                this.setState({
                    admins: res.data.admin,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(admin)
        // console.log(this.state.custCount)
    }
    
    addAdmin = () => {
        this.setState({
            isModalOpen: true,
            admin_id: "",
            name: "",
            username: "",
            password: "",
            action: "insert"
        });
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getAdmin()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container mt-5">
                    
                            <div className="main-body">
                            <div className="row gutters-sm ">
                                    {/* {this.state.admins.map((item, index) => {
                                        return ( */}
                                            <div className="row gutters-sm " >
            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                            <PersonPinCircleOutlinedIcon alt="Admin" className="rounded-circle" sx={{ fontSize: 130 }} />
                            {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"> */}
                            <div className="mt-3" >
                                <h4>Nisa</h4>
                                <p className="text-secondary mb-1">nisa@gamil.com</p>
                                <p className="text-muted font-size-sm">nanang</p>
                                <button className="btn btn-primary">Follow</button>
                                <button className="btn btn-outline-primary">Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <h4>{item.name}</h4>
                                <p className="text-secondary mb-1">{item.username}</p>
                                <p className="text-muted font-size-sm">{item.password}</p> */}
                                             {/* <AdminList key={index}
                                                
                                                // image={"http://localhost:8080/image/customer/" + item.image}//nama file link dari url
                                                // name={item.admin.name}
                                                // username= {item.username}
                                                // password={item.password}
                                                // onEdit={() => this.handleEdit(item)}
                                                // onDel={() => this.handleDel(item.customer_id)}
            
                                            /> */}
                                        {/* )
                                    })} */}

                                
                           
                        </div>
 </div>
                </div>
            </div>
        )
    }
}