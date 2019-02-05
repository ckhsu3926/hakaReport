import fetch from 'cross-fetch'

export const listRecord = article => ({ type:"listRecord", payload: article });
export function fetchList(src){
	return function(dispatch){
		return fetch("http://127.0.0.1:8000/api/lists")
		.then(
			response => response.json(),
			error => console.log("Error at get List ,",error)
		).then(json => 
			dispatch(listRecord(json.reverse()))
		)
	}
}

export const addRecord = article => ({ type: "addRecord", payload: article });
export function uploadRecord(src){
	return function(dispatch){
		return fetch("http://127.0.0.1:8000/api/report",{method: 'POST',body: src})
		.then(
			response => response.json(),
			error => console.log("Error at get List ,",error)
		).then(json => {
			console.log(json);
			dispatch(addRecord({
				date: json.date*1000,
				name: json.name
			}))
		})
	}
}