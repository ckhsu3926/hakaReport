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
        let logData = this.state.logData.split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });
        return (
            <div>
                <a className="fas fa-arrow-left" onClick={this.onHistoryBack}>aaa</a>
                {logData}
            </div>
        );
    }
}