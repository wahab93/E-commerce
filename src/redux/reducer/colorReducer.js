const initialState = {
    primaryColor: '#adcb1d',
    secondaryColor: '#4C7746',
};

const colorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_COLOR':
            return {
                ...state,
                primaryColor: action.payload.primaryColor,
                secondaryColor: action.payload.secondaryColor,
            };
        default:
            return state;
    }
};


export default colorReducer;