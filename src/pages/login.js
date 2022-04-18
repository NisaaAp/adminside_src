import React from 'react';
import "../style/login.css"
import axios from "axios"

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            // logged: false //defaultnya false karena dia belum login
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    } 
    handleLogin = (e) =>{
        e.preventDefault()
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        let url = "http://localhost:8080/store/admin/auth"
        axios.post(url, data)
        .then (res =>{
            if(res.data.logged){
                let name = res.data.data.name
                //tambah data lagi karena pada postman username ada di dalam data ada tiga logged, data, token
                let admin = res.data.data
                let token = res.data.token

                localStorage.setItem("name", name)
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                window.location = "/"


            }else{
                window.alert(res.data.message)
            }
        })
    }
    render(){
        return(
//             <div>
//             <head>
//  <title>Login 10</title>

// </head>
//<body className="img js-fullheight" style="background-image:url(images/xbg.jpg.pagespeed.ic.tiVxeakBSd.webp)">
<section className="ftco-section">
<div className="container">
<div className="row justify-content-center">
<div className="col-md-6 text-center mb-5">
<h2 className="heading-section">Login #10</h2>
</div>
</div>
<div className="row justify-content-center">
<div className="col-md-6 col-lg-4">
<div className="login-wrap p-0">
<h3 className="mb-4 text-center">Have an account?</h3>
<form onSubmit={(e) =>  this.handleLogin(e)} className="signin-form">
<div className="form-group">
<input type="text" className="form-control bg-transparent" name="username" value={this.state.username} placeholder="Username" required onChange={this.handleChange}/>
</div>
<div className="form-group">
<input id="password-field" type="password" className="form-control bg-transparent" name="password" value={this.state.password} placeholder="Password" required onChange={this.handleChange}/>
<span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
</div>
<div className="form-group">
<button type="submit" className="form-control btn btn-primary submit px-3">Log In</button>
</div>
<div className="form-group d-md-flex">
<div className="w-50">
<label className="checkbox-wrap checkbox-primary">Remember Me
<input type="checkbox" checked />
<span className="checkmark"></span>
</label>
</div>
<div className="w-50 text-md-right">
{/* <a href="#" style="color: #fff">Forgot Password</a> */}
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</section>
//</body>
// </div>



        // <div className="container">
        // <main className="form-signin">
        // <form onSubmit={(e) =>  this.handleLogin(e)}>
          
        //   {/* <img className="mb-4" src="foto/dynamiteee ini-01.png" alt="" width="300" > */}
            
        //     <h1 className="h3 mb-3 fw-normal">Please log in</h1>
        //     <div className="form-floating">
        //     <input type="username" className="form-control" id="floatingInput" name="username" value={this.state.username} placeholder="Insert Username" onChange={this.handleChange}/>
        //     <label for="floatingInput">Username</label>
        //     </div>
        //     <div className="form-floating">
        //     <input type="password" className="form-control" id="floatingPassword" name="password" value={this.state.password} placeholder="Password" required onChange={this.handleChange}/>
        //     <label for="floatingPassword">Password</label>
        //     </div>
        //     {/* <a href="tambah_petugas.php">Ingin daftar diri sebagai petugas? Klik Disini</a><br><br> */}
        //     {/* <a href="tampil_petugas.php">Ingin melihat daftar petugas? Klik Disini</a><br><br> */}
        //     <button className="w-100 btn btn-lg btn-danger" type="submit">Log in</button>
        //     <p className="mt-5 text-muted">DYNAMITE SHOP</p>
        //     <p className="mb-3 text-muted">&copy; 2021</p>
        // </form>
        // </main>
        // </div>
       )
    }
}