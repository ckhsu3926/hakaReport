const tmpArray = []
// 	{date:1548942343594,name:"ggccc"}
// ];

export const singleReducer = (state = tmpArray, action) => {
	switch(action.type){
		case "listRecord":
			return action.payload.map((row)=>{
				return {date:row.date*1000,name:row.name}
			})
		break;
		default:
			return state
		break;
	}
};