import fetch from 'cross-fetch'
import { appURL } from "../constVariables"

export const listRecord = article => ({ type:"listRecord", payload: article });
export function fetchList(src){
	return function(dispatch){
		return fetch(appURL+"api/lists")
		.then(
			response => response.json(),
			error => console.log("Error at get List ,",error)
		).then(json => 
			dispatch(listRecord(json.reverse()))
		)
	}
}

export function uploadRecord(src){
	return function(dispatch){
		return fetch( appURL +"api/report",{method: 'POST',body: src})
		.then(
			response => response.json(),
			error => console.log("Error at get List ,",error)
		).then(json => {
			dispatch(fetchList())
		})
	}
}