import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Customer from "./pages/customer";
import Login from "./pages/login";
import Product from "./pages/product";
import Transaksi from "./pages/transaksi";
import Admin from "./pages/admin";
import Admins from "./pages/admins";


//hanya boleh ada 1 exact dimana disitu adalah halaman utama
export default class Main extends React.Component{
    render(){
        return(
            <Switch>
                
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/customer" component={Customer} />
                <Route path="/prod" component={Product} />
                <Route path="/trans" component={Transaksi} />
                <Route path="/admin" component={Admin} />
                <Route path="/admins" component={Admins} />




                
            </Switch>
        )
    }
}