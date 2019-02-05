import React, { Component } from 'react';
import { connect } from "react-redux";

const Headers = ["上傳日期","姓名","hakaMOD_Setup.log","hakaMOD_Component.log"];

class listTable extends React.Component{
	constructor(props){
		super(props);
		this.showRecordDetail = this.showRecordDetail.bind(this);
	}

	showRecordDetail(recordDate,recordType){
	}

	componentDidMount(){
		window.test=this.props;
	}

	render(){
		const listTableBody = this.props.data.reverse().map( (row) => { 
			return (
			<tr key={row.date}>
				<td key={row.date+"date"} align="center">{new Date(row.date).toLocaleString()}</td>
				<td key={row.date+"name"} align="center">{row.name}</td>
				<td key={row.date+"component"} align="center">
					<button onClick={this.showRecordDetail.bind(this,row.date,"component")}>Components</button>
				</td>
				<td key={row.date+"setup"} align="center">
					<button onClick={this.showRecordDetail.bind(this,row.date,"setup")}>Setup</button>
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