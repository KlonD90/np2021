const defaultDistrictsReducer: object[] = []

const districtsReducer: any = (state: object[] = defaultDistrictsReducer, action: any) => {
    switch (action.type) {
        case "GET_DISTRICTS_DATA":
            return action.payload;
        default:
            return state
    }
}

export default districtsReducer;