import React, { Component } from 'react';
import { connect } from "react-redux";
import { uploadRecord } from "../action/record";

class reportBody extends React.Component {
    constructor(props){
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.componentFile = React.createRef();
        this.setupFile = React.createRef();
        this.state = {
            name: ""
        }
    }

    onNameChange(event){
        this.setState({name:event.target.value});
    }

    submitForm(event){
        if(this.state.name.trim()===""){
            alert("請輸入可供辨識之姓名");
            return ;
        }
        if(typeof(this.componentFile.current.files[0])==="undefined"
            || this.componentFile.current.files[0].name.toLowerCase() !== "hakamod_components.log"){
            alert("component failed");
            return ;
        }
        if(typeof(this.setupFile.current.files[0])==="undefined"
            || this.setupFile.current.files[0].name.toLowerCase() !== "hakamod_setup.log"){
            alert("setup failed");
            return ;
        }

        const data = new FormData();
        data.append("component",this.componentFile.current.files[0]);
        data.append("setup",this.setupFile.current.files[0]);
        data.append("name",this.state.name);
        this.props.dispatch(uploadRecord(data));
        this.setState({name:""});
        event.preventDefault();
        this.props.history.push("/");
    }

    render(){
        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label htmlFor="report_name">Facebook Name : </label>
                        <input type="text" onChange={this.onNameChange} value={this.state.name} id="report_name" className="form-control" aria-describedby="nameHelp" placeholder="請輸入可供辨識之姓名"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="report_component">hakaMOD_Components.log</label>
                        <input type="file" ref={this.componentFile} id="report_component" className="form-control-file" aria-describedby="componentHelp"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="report_setup">hakaMOD_Setup.log</label>
                        <input type="file" ref={this.setupFile} id="report_setup" className="form-control-file" aria-describedby="setupHelp"/>
                    </div>
                    <input type="submit" value="上傳" className="btn btn-primary" disabled={!this.state.name}/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { data:state };
}
const Report = connect(mapStateToProps)(reportBody);

export {Report};