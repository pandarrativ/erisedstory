import React, {useState} from 'react';
import RightArrow from "../assets/icons/right-arrow.svg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Signup(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: "",
      });


      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        if(formData.password !== formData.confirmPassword){
            alert("Password not the same!");
            return;
        }

        axios.post("asd", {
          email:formData.email,
          password:formData.password
        })
          .then((resp) => {
            sessionStorage.setItem("erised-user", JSON.stringify(resp.data));
            navigate("/");

          })
          .catch((e) => {
            console.log(e);
            alert(e.response.data)
          })
      };

    return (
        <form className='signup-form' onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className='login-input' onChange={handleChange} required/>
            <input type="password" placeholder="Passcode" className='login-input' onChange={handleChange} required/>
            <input type="password" placeholder="Confirm Passcode" className='login-input' onChange={handleChange} required/>
            <button className='login-form-submit'>Sign Up <img src={RightArrow} alt="right arrow"></img></button>
        </form>
    );
}

export default Signup;