import React, { Component } from 'react';

const Headers = ["上傳日期","姓名","hakaMOD_Setup.log","hakaMOD_Component.log"];
const tmpArray = [
	{date:20190129113256,name:"ggccc"},{date:20190128114283,name:"xeriou"},{date:20190120114283,name:"cph"}
];

class Body extends React.Component{
	constructor(props){
		super(props);
		this.showRecordDetail = this.showRecordDetail.bind(this);
	}

	showRecordDetail(recordDate,recordType){
		console.log(recordDate);
		console.log(recordType);
	}

	render(){
		return this.props.row.map( (row) => {
			return (<tr key={row.date}>
				<td key={row.date+"date"} align="center">{row.date}</td>
				<td key={row.date+"name"} align="center">{row.name}</td>
				<td key={row.date+"component"} align="center">
					<button onClick={this.showRecordDetail.bind(this,row.date,"component")}>Components</button>
				</td>
				<td key={row.date+"setup"} align="center">
					<button onClick={this.showRecordDetail.bind(this,row.date,"setup")}>Setup</button>
				</td>
			</tr>)
			}
		)
	}
}

export default class List extends React.Component {
	render(){
		return (
			<div>
				<table>
					<thead>
						<tr>
							{ Headers.map( (col) => { 
								return <th key={col}>{col}</th> 
							}) }
						</tr>
					</thead>
					<tbody>
						<Body row={tmpArray} />
					</tbody>
				</table>
			</div>
		);
	}
}