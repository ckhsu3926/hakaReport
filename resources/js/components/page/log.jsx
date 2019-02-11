import React, { Component } from 'react';
import { connect } from "react-redux";
import { appURL } from "../constVariables"

export class Log extends React.Component {
    constructor(props){
        super(props);
        this.onHistoryBack = this.onHistoryBack.bind(this);
        this.state = {
            logData: "",
            IS_LOADING: true,
            IS_FETCHFAILED: false,
        };
    }

    onHistoryBack(){
        this.props.history.push("/");
    }

    componentDidMount(){
        if( typeof(this.props.location.state)==="undefined" ){ 
            this.props.history.push("/") 
        }else{
            const logInfo = new FormData();
            logInfo.append("type",this.props.location.state.type);
            logInfo.append("date",this.props.location.state.date);
            fetch(appURL + "api/files",{method: "POST",body: logInfo})
            .then(
                response => {
                    if(response.status >= 400){
                        throw new Error("Bad response from server");
                    }
                    return response.text()
                }
            ).then( text => {
                this.setState({
                    logData: text,
                    IS_LOADING: false,
                    IS_FETCHFAILED: false
                });
            }).catch( e => {
                this.setState({
                IS_LOADING: false,
                IS_FETCHFAILED: e.toString()
            })} )
        }
    }

    render(){
        return (
            <div>
                {this.state.IS_LOADING?<span style={{fontSize: '3em'}}>Loading</span>:""}
                {this.state.IS_FETCHFAILED?<span style={{fontSize: '3em'}}>{this.state.IS_FETCHFAILED}</span>:""}
                <a className="fas fa-arrow-alt-circle-left fa-2x float-right" onClick={this.onHistoryBack}>回到列表</a>
                <div className="display-linebreak">{this.state.logData}</div>
            </div>
        );
    }
}