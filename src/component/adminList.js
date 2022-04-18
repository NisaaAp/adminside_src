
import React from "react";
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';

export default class AdminsList extends React.Component{
    render(){
        return(
            <div className="container">
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
                            
                                <tr >
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>
 
                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropAdmin(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            
                        </tbody>
                    </table>
                    </div>

           
        )
    }
}