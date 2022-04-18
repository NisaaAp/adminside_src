import React from "react";
import Navbar from '../component/navbar';
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";




export default class Admins extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            admins: [],
            admin_id: "",
            name: "",
            username: "",
            password: "",
            fillPassword: true,
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

    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getAdmin = () => {
        let admin = (localStorage.getItem("name"))
        let url = "http://localhost:8080/store/admin"
        axios.get(url, this.headerConfig())
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



    handleEdit = item => {

        this.setState({
            isModalOpen: true,
            action: "update",
            admin_id: item.admin_id,
            name: item.name,
            username: item.username,
            password: "",
            fillPassword: false,
        })


    }

    Add = () => {
        // $(window).load(function() {
        // $("#modal_admin").modal("show")
        this.setState({
            isModalOpen: true,
            action: "insert",
            admin_id: 0,
            name: "",
            username: "",
            password: "",
            fillPassword: true,
        })
        // })
    }

    dropAdmin = admin_id => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = "http://localhost:8080/store/admin/" + admin_id
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getAdmin()
                })
                .catch(error => console.log(error))
        }
    }



    handleSave = e => {
        e.preventDefault()
        // $("#modal_admin").modal("hide")
        let form = {
            admin_id: this.state.admin_id,
            name: this.state.name,
            username: this.state.username
        }

        if (this.state.fillPassword) {
            form.password = this.state.password
        }
        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/store/admin"
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getAdmin()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            url = "http://localhost:8080/store/admin/" + this.state.admin_id
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getAdmin()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        }
    }


    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getAdmin()
    }

    render() {
        return (
            <div>
                <Navbar />
                {/* <div className="back"> */}
                <div className="container bg-light">
                    <h3 className="text-bold text-info mt-2">Admin List</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.admins.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.username}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info m-1"
                                                onClick={() => this.handleEdit(item)}>
                                                Edit
                                            </button>

                                            <button className="btn btn-sm btn-danger m-1"
                                                onClick={() => this.dropAdmin(item.admin_id)}>
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Add Admin
                    </button>

                    {/* modal admin  */}
                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Admin</Modal.Title>
                        </Modal.Header>
                        <Form className="bg-secondary bg-opocity-10" onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                {/* <Form.Group className="mb-3 text-dark bg-transparent" controlId="nip">
                                    <Form.Label >ID</Form.Label>
                                    <Form.Control className="text-dark" type="text" name="customer_id" placeholder="Masukkan ID" value={this.state.customer_id} onChange={this.handleChange} />
                                </Form.Group> */}
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="name">
                                    <Form.Label className="text-white" >Admin Name </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="name" placeholder="Masukkan Nama" value={this.state.name}
                                        onChange={e => this.setState({ name: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="text-white">Username</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="username" placeholder="Masukkan  Username" value={this.state.username}
                                        onChange={e => this.setState({ username: e.target.value })}
                                        required
                                    />
                                </Form.Group>
                                {this.state.action === "update" && this.state.fillPassword === false ? (
                                    <Button className="btn btn-sm btn-secondary mb-1 btn-block"
                                        onClick={() => this.setState({ fillPassword: true })}>
                                        Change Password
                                    </Button>

                                ) : (

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label className="text-white">Password</Form.Label>
                                        <Form.Control className="text-dark bg-transparent" type="password" name="password" placeholder="Masukkan Password" value={this.state.password}
                                            onChange={e => this.setState({ password: e.target.value })}

                                        />
                                    </Form.Group>
                                )}
                            </Modal.Body>
                            <Modal.Footer>

                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" onClick={this.handleClose}>
                                    Save
                                </Button>

                            </Modal.Footer>
                        </Form>
                    </Modal>
                    {/* <div className="modal fade" id="modal_admin">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Admin</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveAdmin(ev)}>
                                        Admin Name
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.name}
                                        onChange={ev => this.setState({name: ev.target.value})}
                                        required
                                        />
 
                                        Username
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({username: ev.target.value})}
                                        required
                                        />
 
                                        { this.state.action === "update" && this.state.fillPassword === false ? (
                                            <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                            onClick={() => this.setState({fillPassword: true})}>
                                                Change Password
                                            </button>
                                        ) : (
                                            <div>
                                                Password
                                                <input type="password" className="form-control mb-1"
                                                value={this.state.password}
                                                onChange={ev => this.setState({password: ev.target.value})}
                                                required
                                                />
                                            </div>
                                        ) }
 
                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> */}


                </div>
            </div>
            // </div>
        )
    }
}

