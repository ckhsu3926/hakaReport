const tmpArray = [
	{date:1548942343594,name:"ggccc"},
	{date:1548947653594,name:"xeriou"},
	{date:1548941923594,name:"cph"},
	{date:1548943483594,name:"star"},
	{date:1548942943594,name:"sudo"}
];

export const singleReducer = (state = tmpArray, action) => {
	switch(action.type){
		case "addRecord":
			return [...state,action.payload]
		break;
		default:
			return state
		break;
	}
};