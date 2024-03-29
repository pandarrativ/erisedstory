import React from 'react';
import '../assets/css/login-modal.css';

function LoginModal({ onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">

                <form className="modal-form">
                    <div className="input-field">
                        <label htmlFor="username" className="modal-label">user name:</label>
                        <input type="text" id="username" placeholder="username / email" className="modal-input" />
                    </div>
                    
                    <div className="input-field">
                        <label htmlFor="password" className="modal-label">password:</label>
                        <input type="password" id="password" placeholder="password" className="modal-input" />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="modal-forgot"> forgot password / username </button>
                        <button type="submit" className="modal-signin">sign in</button>
                    </div>

                    <button type="button" className="modal-signup">new? sign up!</button>
                    <button type="button" className="modal-google-signup">sign up with Google</button>
                </form>
                <button type="button" className="modal-close" onClick={onClose}>×</button>
            </div>
        </div>
    );
}

export default LoginModal;
