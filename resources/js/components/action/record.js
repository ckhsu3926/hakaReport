import fetch from 'cross-fetch'
import { appURL } from "../constVariables"

export const fetchFailed = article => ({ type:"fetchFailed", payload: article });

export const listRecord = article => ({ type:"listRecord", payload: article });
export function fetchList(src){
	return function(dispatch){
		return fetch(appURL+"api/lists")
		.then(
			response => {
				if(response.status >= 400){
					throw new Error("Bad response from server");
				}
				return response.json();
			}
		).then(json => 
			dispatch(listRecord(json.reverse()))
		).catch(e => dispatch(fetchFailed(e)))
	}
}

export const listLoading = article => ({ type:"listLoading", payload: article });
export function uploadRecord(src){
	return function(dispatch){
		dispatch(listLoading());
		return fetch( appURL +"api/report",{method: 'POST',body: src})
		.then(
			response => {
				if(response.status >= 400){
					throw new Error("Bad response from server");
				}
				return response.json();
			}
		).then(json => {
			dispatch(fetchList())
		}).catch(e => dispatch(fetchFailed(e)))
	}
}