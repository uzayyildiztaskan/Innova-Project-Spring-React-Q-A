import React from 'react';

class RegisterUserPage extends React.Component{

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordConfirm: null
    }

    onChange = event => {

        const { name, value} = event.target;
        this.setState({
            [name] : value
        })
    }

    render(){

        return(
            <form>
                <h1>Sign up</h1>
                <div>
                    <label>Username</label>
                    <input name = "username" onChange={this.onChange} />
                </div>
                <div>
                    <label>Display Name</label>
                    <input name = "displayName" onChange={this.onChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input name = "password" type="password" onChange={this.onChange} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input name = "passwordConfirm" type="password" onChange={this.onChange} />
                </div>
                <button>Sign Up</button>
            </form>
        );
    }
}
export default RegisterUserPage;