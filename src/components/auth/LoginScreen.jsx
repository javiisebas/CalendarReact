import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogin, startRegister } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'
import './login.css'

const LoginScreen = () => {

    const dispatch = useDispatch()

    const [formLoginValues, handleLoginInputChange] = useForm({
        emailLogin: 'javi.sebas@hotmail.es',
        passwordLogin: '123456'
    })
    const { emailLogin, passwordLogin } = formLoginValues


    const [formRegisterValues, handleRegisterInputChange] = useForm({
        nameRegister: 'Javi',
        emailRegister: 'javi.sebas171@gmail.com',
        passwordRegister: '123456',
        repasswordRegister: '123456'
    })
    const { nameRegister, emailRegister, passwordRegister, repasswordRegister } = formRegisterValues


    const handleSubmitLogin = (e) => {
        e.preventDefault()
        dispatch(startLogin(emailLogin, passwordLogin))
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault()
        dispatch(startRegister(nameRegister, emailRegister, passwordRegister, repasswordRegister))
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleSubmitLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='emailLogin'
                                value={emailLogin}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='passwordLogin'
                                value={passwordLogin}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleSubmitRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='nameRegister'
                                value={nameRegister}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='emailRegister'
                                value={emailRegister}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='passwordRegister'
                                value={passwordRegister}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='repasswordRegister'
                                value={repasswordRegister}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen