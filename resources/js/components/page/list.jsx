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
		const listTableBody = this.props.store.data.map( (row) => { 
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
		console.log(this.props.store);
		return (
			<div>
				{ this.props.store.IS_LOADING?<h2>LOADING...</h2>:"" }
				{ this.props.store.fetchStatus?<h2>{this.props.store.fetchStatus}</h2>:"" }
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

const mapStateToProps = state => {
	return { store:state };
}
const ListBody = connect(mapStateToProps)(listTable);

export default class List extends React.Component {
	render(){
		return (
			<ListBody />
		);
	}
}