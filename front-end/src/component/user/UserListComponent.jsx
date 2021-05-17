import React, { Component } from 'react'
import ApiService from "../../ApiService"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

export class UserListComponent extends Component {

    constructor(props){
        super(props);

        this.state={
            users:[],
            maessage: null
        }
    }

    componentDidMount(){
        this.reloadUserList();
    }

    reloadUserList(){
        ApiService.fetchUsers()
            .then(res =>{
                this.setState({
                    users: res.data
                })
            })
            .catch(err =>{
                console.log('reloadUserList() Error!',err);
            });
    }
    deleteUser=(userID)=>{
        ApiService.deleteUser(userID)
        .then(res=>{
            this.setState({
                maessage:'User Deleted Successfully.'
            });
            this.setState({
                users:this.sate.users.filter( user =>
                    user.id !== userID)
            });
        })
        .catch(err =>{
            console.log('deleteUser() Error!',err);
        })
    }

    editUser=(ID)=>{
        window.localStorage.setItem("userId",ID);
        this.props.history.push('/edit-user');

    }

    addUser=()=>{
        window.localStorage.removeItem("userID");
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>User List</Typography>
                <Button variant="contained" color="primary" onClick={this.addUser}> Add User</Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>FirstNmae</TableCell>
                            <TableCell align="right">LastNmae</TableCell>
                            <TableCell align="right">UserNmae</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Salary</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Dleete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map( user =>
                            
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="user">{user.id}</TableCell>
                            <TableCell align="right">{user.firstName}</TableCell>
                            <TableCell align="right">{user.lastName}</TableCell>
                            <TableCell align="right">{user.username}</TableCell>
                            <TableCell align="right">{user.age}</TableCell>
                            <TableCell align="right">{user.salary}</TableCell>
                            <TableCell align="right" onClick={() => this.editUser(user.id)}><CreateIcon/></TableCell>
                            <TableCell align="right" onClick={() => this.deleteUser(user.id)}><DeleteIcon/></TableCell>
                            
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
                
            </div>
        )
    }
}

const style = {
    display: 'flex',
    justifyContent:'center'
}

export default UserListComponent