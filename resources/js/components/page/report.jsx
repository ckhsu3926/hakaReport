import React, { Component } from 'react';
import { connect } from "react-redux";
import { addRecord } from "../action/record";

class reportBody extends React.Component {
    constructor(props){
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.state = {
            name: ""
        }
    }

    onNameChange(event){
        this.setState({name:event.target.value});
    }

    submitForm(event){
        this.props.dispatch(addRecord({
            date:new Date().getTime(),
            name:this.state.name
        }));
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
                <input type="file" /><br/>
                <label>hakaMOD_Setup.log : </label>
                <input type="file" /><br/>
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