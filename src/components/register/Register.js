import React from 'react'

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }
    }

    oneRegisterNameChange = (event) =>{
        this.setState({registerName: event.target.value})
    }

    onRegisterEmailChange = (event) =>{
        this.setState({registerEmail: event.target.value})
    }
    onRegisterPasswordChange = (event) =>{
        this.setState({registerPassword: event.target.value})
    }

    onRegisterSubmitSignIn = () =>{
        const {registerEmail, registerName, registerPassword} = this.state;
        if(registerEmail.length && registerPassword.length){

            fetch('https://powerful-reef-77714.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: registerEmail,
                password: registerPassword,
                name: registerName
            })
        }).then(response => response.json()).then(user => {
            
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            
        })

        }else {
            alert('fill the fields mate')
        }
        
        
    }


    render(){

        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
            <main className="pa4 black-80">
                <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" 
                            type="text" 
                            name="person-name" 
                            id="person-name"
                            onChange={this.oneRegisterNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" 
                            type="email" 
                            name="email-address" 
                            id="email-address"
                            onChange={this.onRegisterEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" 
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={this.onRegisterPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onRegisterSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit" value="Register" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('signIn')} className=" pointer f4 link dim black db">Sign In</p>
                    </div>
                </div>
            </main>
            </article>
        );

    }

    
}


export default Register;
