import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const Headers = ["上傳日期","姓名","hakaMOD_Setup.log","hakaMOD_Component.log"];

class listTable extends React.Component{
	constructor(props){
		super(props);
		this.showRecordDetail = this.showRecordDetail.bind(this);
	}

	showRecordDetail(recordDate,recordType){
		this.props.history.push("/Log");
	}

	render(){
		const listTableBody = this.props.data.map( (row) => { 
			return (
			<tr key={row.date}>
				<td key={row.date+"date"} align="center">{new Date(row.date).toLocaleString()}</td>
				<td key={row.date+"name"} align="center">{row.name}</td>
				<td key={row.date+"component"} align="center">
					<NavLink to={{
						pathname:"/log"
						,state:{ type:"component", date:row.date/1000 }
					}}>Components</NavLink>
				</td>
				<td key={row.date+"setup"} align="center">
					<NavLink to={{
						pathname:"/log"
						,state:{ type:"setup", date:row.date/1000 }
					}}>Setup</NavLink>
				</td>
			</tr>
		)})
		return (
			<table>
				<thead>
					<tr>
						{ Headers.map( (col) => { 
							return <th key={col}>{col}</th> 
						}) }
					</tr>
				</thead>
				<tbody>
					{listTableBody}
				</tbody>
			</table>
		)
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