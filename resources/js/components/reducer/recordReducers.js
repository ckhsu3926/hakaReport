const tmpArray = [
	{date:20180129113256,name:"ggccc"},
	{date:20180128114283,name:"xeriou"},
	{date:20180120115421,name:"cph"},
	{date:20180120111093,name:"star"},
	{date:20180120117524,name:"sudo"}
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