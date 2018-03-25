import React from 'react';
import { DataSection } from './DataSection';
import WithLoading from './WithLoading';
import axios from 'axios';

//Higher Order Component
const LoaderComponent = WithLoading(DataSection);

let siteDomain = "http://localhost:3001/"
const hostAPIurl = siteDomain+"api/users";

export class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mainData : [],
            isLoading: true,
        }
    }
    loadDataFromServer(){
        axios.get(hostAPIurl)
            .then(res=>{
                this.setState((prevState,props)=>{
                    return{
                        mainData : res.data,
                        isLoading :false
                    }
                })
            })
            .catch(res=>{
                if(res instanceof Error){
                    console.log(res.message);
                    alert("Network Error...Reload The page!");
                }
                else{
                    console.log(res.data);
                }
            })
    }
    componentDidMount() {
        if(hostAPIurl.length == 0){
                this.setState((prevState,props)=>{
                    return {
                        isLoading :true
                    }
                })
        }
        else{
            this.loadDataFromServer();
        }
      }

    render(){
        return(
            <LoaderComponent 
                isLoading={this.state.isLoading} 
                data={this.state.mainData} >
            </LoaderComponent>

        )
    }
}