import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/auth/login`, userCredentials)
            .then(res => {
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
                localStorage.setItem('token', JSON.stringify(res.data.token));
            })
            .catch(err => {
                dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.msg });
            })
    } catch (error) {

    }
}

export const getUser = async (token, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/users/get-user`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
        })
        .catch(err => {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.msg });
        })
}
