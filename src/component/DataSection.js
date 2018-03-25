import React from 'react';
import {DataInput} from './DataInput';
import {UserData} from './UserData';
import axios from 'axios';

let siteDomain = "http://localhost:3001/"
const hostAPIurl = siteDomain+"api/users";

export class DataSection extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            fullUserData : props.userData,
            updateDataStatus : false,
            updatedData : [],
            updatingFlag : false
        }
    }
    updataData(uniqueDBidUpdate){
        for(let ind in this.state.fullUserData){
            if(this.state.fullUserData[ind]._id == uniqueDBidUpdate){
                this.setState((prevState,props)=>{
                    return{
                        updatedData : this.state.fullUserData[ind],
                        updateDataStatus : true
                    }
                })
            }
          }
    }
    updateDataOnClick(e){
        this.state.updatedData.empid = this.refs.empid.value;
        this.state.updatedData.empname = this.refs.empname.value;
        this.setState((prevState,props)=>{
            return{
                updatedData : this.state.updatedData,
                updateDataStatus : false
            }
        })
        let uniqueURL = hostAPIurl+"/"+this.state.updatedData._id;
        axios.put(uniqueURL, this.state.updatedData)
            .then(res => {
                console.log('User Updated');
            })
            .catch(err => {
                console.log(err);
            })
    }
    deleteData(uniqueDBid){
        let uniqueURL = hostAPIurl+"/"+uniqueDBid;
        axios.delete(uniqueURL)
            .then(res => {
                console.log('User deleted');
            })
            .catch(err => {
                console.error(err);
      });
      for(let ind in this.state.fullUserData){
          if(this.state.fullUserData[ind]._id == uniqueDBid){
                delete this.state.fullUserData[ind];
          }
        }
      this.setState((prevState,props)=>{
            return{
                fullUserData : this.state.fullUserData
            }
        })
    }
    refreshData(updated){
        let newData;
        newData = updated;
        this.setState((prevState,props)=>{
            return{
                updatingFlag : true
            }
        })
        axios.post(hostAPIurl,newData)
        .then(res => {
            axios.get(hostAPIurl)
        .then(res=>{
            this.setState((prevState,props)=>{
                return{
                    fullUserData : res.data,
                    updatingFlag : false
                }
            })
        })
        })
        .catch(res=>{
            if(res instanceof Error){
                console.log(res.message);
            }
            else{
                console.log(res.data);
            }
        })
    }

    render(){
        let emptyData = true;
        if(this.state.fullUserData.length > 0){
            emptyData = !emptyData;
        }
        const characteristics = this.state.fullUserData.map((key) => {
            return (
             <UserData 
                uniqueID={key._id}
                empId={key.empid}
                empName={key.empname}
                onUserDelete={this.deleteData.bind(this)}
                onUserUpdate={this.updataData.bind(this)}
                key={ key._id}>>
            </UserData>
            );
          });

        return(
            <section id="home-page">
                <header><h1>Employees List</h1></header>
                {this.state.updatingFlag && <h1>updating data...</h1>}
                {emptyData && (<div>Currently No data present...Add a new Employee</div>)}
                <section id="emp-details-wrap">
                    {characteristics}
                </section>
                {this.state.updateDataStatus && (
                    <section id="emp-update-wrap">
                    <header><h1>Update User Data</h1></header>
                    <label>Employee ID</label>
                        <input 
                            type="text" 
                            ref="empid"
                            defaultValue={this.state.updatedData.empid}
                        />
                    <label>Name</label>
                    <input 
                        type="text" 
                        ref="empname"
                        defaultValue={this.state.updatedData.empname} 
                        />
                    <button onClick={(e)=>this.updateDataOnClick(e)}>UPDATE</button>
                        </section>
                    )}
                <section id="emp-add-wrap">
                    <DataInput refreshdata={this.refreshData.bind(this)}></DataInput>
                </section>
            </section>
        )
    }
}