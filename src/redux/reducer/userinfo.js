const initial = {
    user: null,
    isAdmin: false
}

const userinfihandler = (state = initial, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isAdmin: action.payload.isAdmin
            }
            break;
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAdmin: false, // Reset isAdmin on logout
            }
            break;
        default:
            return state
            break;
    }
}
export default userinfihandler