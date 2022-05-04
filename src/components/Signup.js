import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const host = "http://localhost:5000";
    const navigate = useNavigate();
    const [credencials, setCredencials] = useState({name:"", email: "", password: "", cpassword: ""});
    const onchange = (e) => {
        setCredencials({ ...credencials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credencials;
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email, password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success) {
              //Save token in session
              sessionStorage.setItem('token', JSON.stringify(json.authtoken));
              navigate("/login");
              props.showAlert("User created successfully", "success");
          }else{
              props.showAlert("Invalid credencials", "danger");
          }

    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            onChange={onchange}
            aria-describedby="nameHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            onChange={onchange}
            aria-describedby="emailHelp"
          />
          <div id="email" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            onChange={onchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            id="cpassword"
            onChange={onchange}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
