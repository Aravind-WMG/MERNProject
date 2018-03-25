import React from 'react';

export class UserData extends React.Component{
    constructor(props){
        super(props);
    }
    delete(){
        this.props.onUserDelete(this.props.uniqueID);
    }
    update(){
        this.props.onUserUpdate(this.props.uniqueID);
    }
    render(){
        return(
          <div className="user-wrap">
            <span className="empid">{this.props.empId}</span>
            <span className="empname">{this.props.empName}</span>
            <button onClick={this.update.bind(this)}>UPDATE</button>
            <button onClick={this.delete.bind(this)}>DELETE</button>
          </div>
        )
    }
}