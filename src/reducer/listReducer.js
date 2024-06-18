const initialState = {
    loading: false,
    user: null,
    error: ""
};

function listReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case 'LIST_SUCCESS':
            return { loading: false, user: "ho" }

        default:
            return state
    }

}

export default listReducer