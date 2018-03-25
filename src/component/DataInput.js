import React from 'react'

export class DataInput extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            empid: '', 
            empname: '' 
        };
    }
    addUser(e){
        e.preventDefault();
        if(this.refs.empid.value == "" || this.refs.empname.value == ""){
            alert("ADD EMP ID OR EMP NAME"); 
            return;
        }
        let _empid = this.state.empid.trim();
        let _empname = this.refs.empname.value.trim();
        this.props.refreshdata({ empid: _empid, empname: _empname });
        this.setState({ empid: '', empname: '' });
        this.refs.empid.value = "";
        this.refs.empname.value = "";
    }
    handleEmpIdChange(e) {
        this.setState({ empid: e.target.value });
    }
    render(){
        return(
            <section id="add-new-section">
                <header><h1>Add a New Employee</h1></header>
                <label>Employee ID</label>
                <input 
                    type="text" 
                    ref="empid"
                    onChange={this.handleEmpIdChange.bind(this)} 
                />
                <label>Name</label>
                <input type="text" ref="empname"/>
                <button onClick={(e)=>this.addUser(e)}>ADD</button>
            </section>
        )
    }
}