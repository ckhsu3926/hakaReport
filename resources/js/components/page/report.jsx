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
        if(this.componentFile.current.files[0].name.toLowerCase() !== "hakamod_components.log"){
            alert("component failed");
            return ;
        }
        if(this.setupFile.current.files[0].name.toLowerCase() !== "hakamod_setup.log"){
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
                <label>Facebook Name : </label>
                <input type="text" onChange={this.onNameChange} value={this.state.name}/><br/>
                <label>hakaMOD_Components.log : </label>
                <input type="file" ref={this.componentFile}/><br/>
                <label>hakaMOD_Setup.log : </label>
                <input type="file" ref={this.setupFile}/><br/>
                <input type="submit" value="上傳" />
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