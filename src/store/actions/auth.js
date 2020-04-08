import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}; 

export const authSuccess = (token, userId, firstname) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        firstname: firstname
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstname');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (payload, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBB91Ln4Ld1LRpCJU5G6PjO0o2m_CXxSsw ';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBB91Ln4Ld1LRpCJU5G6PjO0o2m_CXxSsw ';
            axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                //temporary shop link
                axios.get( 'https://shop-9f1fc.firebaseio.com/' + response.data.localId + '/userData.json')
                    .then(res =>{
                        let firstname = res.data.firstname
                        localStorage.setItem('firstname', firstname);
                        dispatch(authSuccess(response.data.idToken, response.data.localId, firstname));
                        dispatch(checkAuthTimeout(response.data.expiresIn));
                    })
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
        }else{
            axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('firstname', payload.firstname);
                const userData = {
                    firstname: payload.firstname,
                    lastname:payload.lastname,
                    email: payload.email,
                };
                //temporary shop link
                axios.put('https://shop-9f1fc.firebaseio.com/'+ response.data.localId +'/userData.json', userData).then(() => {
                    dispatch(authSuccess(response.data.idToken, response.data.localId, userData.firstname));
                    dispatch(checkAuthTimeout(response.data.expiresIn));
                })
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
        }
    };
};

export const setAuthRedirectPath = (path) => {
    console.log('action' + path)
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const firstname = localStorage.getItem('firstname');
                dispatch(authSuccess(token, userId, firstname));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    };
};
