import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Headers = ["上傳日期","姓名","hakaMOD_Component.log","hakaMOD_Setup.log"];

class listTable extends React.Component{
	constructor(props){
		super(props);
		this.showRecordDetail = this.showRecordDetail.bind(this);
	}

	showRecordDetail(recordDate,recordType){
		this.props.history.push("/Log");
	}

	render(){
		console.log(this.props);
		if(this.props.data.length==0){
			return (
				<button className="btn btn-primary" type="button" disabled>
				  	<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				  	Loading...
				</button>
			)
		}else{
			const listTableBody = this.props.data.map( (row) => { 
				return (
				<tr key={row.date}>
					<th key={row.date+"date"} scope="row">{new Date(row.date).toLocaleString()}</th>
					<td key={row.date+"name"}>{row.name}</td>
					<td key={row.date+"component"} align="center">
						<NavLink to={{
							pathname:"/log"
							,state:{ type:"component", date:row.date/1000 }
						}} className="btn btn-primary">Components</NavLink>
					</td>
					<td key={row.date+"setup"} align="center">
						<NavLink to={{
							pathname:"/log"
							,state:{ type:"setup", date:row.date/1000 }
						}} className="btn btn-info">Setup</NavLink>
					</td>
				</tr>
			)})
			return (
				<div>
					<table className="table table-bordered table-hover">
						<thead className="thead-dark">
							<tr>
								{ Headers.map( (col) => { 
									return <th key={col} scope="col">{col}</th> 
								}) }
							</tr>
						</thead>
						<tbody>
							{listTableBody}
						</tbody>
					</table>
				</div>
			)
		}
	}
}

const mapStateToProps = state => {
	return { data:state };
}
const ListBody = connect(mapStateToProps)(listTable);

export default class List extends React.Component {
	render(){
		return (
			<ListBody />
		);
	}
}