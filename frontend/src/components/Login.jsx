import React from 'react';

function Login(props) {
    return (
        <form className='login-form'>
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Passcode" />
            <button className='login-form-submit'>Sign In</button>
        </form>
    );
}

export default Login;