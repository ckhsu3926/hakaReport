const initState = {IS_LOADING: true,data:[],fetchStatus: ""}

export const singleReducer = (state = initState, action) => {
	switch(action.type){
		case "fetchFailed":
			return Object.assign({}, state, {
				fetchStatus: action.payload.message,
				IS_LOADING: false
			});
		break;
		case "listRecord":
			return Object.assign({}, state, {
				IS_LOADING: false,
				fetchStatus: "",
				data:
					action.payload.map((row)=>{
						return {date:row.date*1000,name:row.name}
					})
				}
			)
		break;
		case "listLoading":
			return Object.assign({}, state, {
				IS_LOADING: true
			});
		break;
		default:
			return state
		break;
	}
};