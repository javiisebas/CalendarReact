import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { fireErrorsSwal } from "../helpers/fireErrorsSwal"
import { types } from "../types/types"

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST')
        const { ok: resStatus, token, uid, name, msg, errors } = await resp.json()

        if (resStatus) {
            localStorage.setItem('token', token)
            localStorage.setItem('token-init-time', new Date().getTime())

            dispatch(login({
                uid, name
            }))
        } else {
            fireErrorsSwal(msg, errors)
        }

    }
}

export const startRegister = (username, email, password, repassword) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/new', { name: username, email, password, repassword }, 'POST')
        const { ok: resStatus, token, uid, name, msg, errors } = await resp.json()

        if (resStatus) {
            localStorage.setItem('token', token)
            localStorage.setItem('token-init-time', new Date().getTime())

            dispatch(login({
                uid, name
            }))

            Swal.fire('Success', 'El usuario ha sido creado con éxito', 'success')
        } else {
            fireErrorsSwal(msg, errors)
        }

    }
}

export const startChecking = () => {
    // Chequeamos que el usuario tenga un token en su localStorage. Además, si lo tiene, se lo renovamos y hacemos un login
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew')
        const { ok: resStatus, newToken, uid, name } = await resp.json()

        if (resStatus) {
            localStorage.setItem('token', newToken)
            localStorage.setItem('token-init-time', new Date().getTime())

            dispatch(login({
                uid, name
            }))
        } else {
            dispatch(checkingFinish())
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(logout())
    }
}

export const logout = () => ({ type: types.authLogout })