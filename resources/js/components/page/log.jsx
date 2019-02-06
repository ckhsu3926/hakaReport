import React, { Component } from 'react';
import { connect } from "react-redux";

export class Log extends React.Component {
    constructor(props){
        super(props);
        this.onHistoryBack = this.onHistoryBack.bind(this);
        this.state = { logData: "" };
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
            fetch("http://127.0.0.1:8000/api/files",{method: "POST",body: logInfo})
            .then(
                response => response.text(),
                error => console.log("Error at showLog ,",error)
            ).then(text => {
                this.setState({logData: text});
            })
        }
    }

    render(){
        if(this.state.logData.length===0){
            return (
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...
                </button>
            )
        }else{
            let logData = this.state.logData.split('\n').map((item, i) => {
                return <p key={i}>{item}</p>;
            });
            return (
                <div>
                    <a className="fas fa-arrow-alt-circle-left fa-2x float-right" onClick={this.onHistoryBack}>回到列表</a>
                    {logData}
                </div>
            );
        }
    }
}