import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index.js';
import { Redirect } from 'react-router-dom';
import './Auth.css';

class Auth extends Component {
  state={
    signin:{
      email:{
        elementType: 'input',
        elementConfig:{
          type:'email',
          placeholder:'email address'
        },
        value:''
      },
      password:{
        elementType: 'input',
        elementConfig:{
          type:'password',
          placeholder:'password'
        },
        value:''
      }
    },
    signup:{
      firstname:{
        elementType: 'input',
        elementConfig:{
          type:'text',
          placeholder:'First Name'
        },
        value:''
      },
      lastname:{
        elementType: 'input',
        elementConfig:{
          type:'text',
          placeholder:'Last Name'
        },
        value:''
      },
      email:{
        elementType: 'input',
        elementConfig:{
          type:'email',
          placeholder:'email address'
        },
        value:''
      },
      password:{
        elementType: 'input',
        elementConfig:{
          type:'password',
          placeholder:'password'
        },
        value:''
      }
    },
    isSignup: false
  }

  signinInputChangedHandler = (event, controlName) => {
    const updatedForm = {
      ...this.state.signin,
      [controlName]:{
        ...this.state.signin[controlName],
        value: event.target.value
      }
    };
    this.setState({signin: updatedForm});
  }

  signupInputChangedHandler = (event, controlName) => {
    const updatedForm = {
      ...this.state.signup,
      [controlName]:{
        ...this.state.signup[controlName],
        value: event.target.value
      }
    };
    this.setState({signup: updatedForm});
  }

  submitHandler = ( event ) => {
      event.preventDefault();
      if (this.state.isSignup == false){
        console.log(this.state.signin.email.value+ this.state.signin.password.value+ this.state.isSignup);
        let payload = {email: this.state.signin.email.value, password: this.state.signin.password.value}
        this.props.onAuth(payload, this.state.isSignup);
      } else{
        console.log(this.state.isSignup)
        let payload = { 
          firstname: this.state.signup.firstname.value,
          lastname: this.state.signup.lastname.value,
          email: this.state.signup.email.value, 
          password: this.state.signup.password.value
        }
        this.props.onAuth(payload, this.state.isSignup);
      }
  }

  switchAuthModeHandler = () => {
      this.setState(prevState => {
          return {isSignup: !prevState.isSignup};
      });
  }

  componentDidMount(){
    if (this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  render(){
    let authRedirect = null;
    if (this.props.isAuthenticated) {
        authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
    const signinElementsArray = [];
    for (let key in this.state.signin) {
        signinElementsArray.push({
            id: key,
            config: this.state.signin[key]
        });
    }
    let signinform = signinElementsArray.map(signinElement => (
      <Input
        key={signinElement.id}
        elementType={signinElement.config.elementType}
        elementConfig={signinElement.config.elementConfig}
        value={signinElement.config.value}
        changed={(event) => this.signinInputChangedHandler(event, signinElement.id)}
      />
    ))

    const signupElementsArray = [];
    for (let key in this.state.signup) {
        signupElementsArray.push({
            id: key,
            config: this.state.signup[key]
        });
    }

    let signupform = signupElementsArray.map(signupElement => (
      <Input
        key={signupElement.id}
        elementType={signupElement.config.elementType}
        elementConfig={signupElement.config.elementConfig}
        value={signupElement.config.value}
        changed={(event) => this.signupInputChangedHandler(event, signupElement.id)}
      />
    ))

    if (this.props.loading) {
        //signinform = <Spinner />
        //signupform = <Spinner />
    }

    let errorMessage = null;

    if (this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p> 
        );
    }

    return(
      <div>
      {authRedirect}
      {errorMessage}
      <div className="auth-title">{this.state.isSignup ? 'Sign Up' : 'Sign In'}</div>
        <div className="loginInput">
          <form onSubmit={this.submitHandler}>
            {this.state.isSignup ? signupform : signinform}
            <Button className="btn btn-primary auth-button">Submit</Button>
          </form>
        </div> 
        <Button
            clicked={this.switchAuthModeHandler}
            className="btn btn-primary auth-button">{this.state.isSignup ? 'Sign In Instead' : 'Don\'t have an account? Register here'}</Button>
      </div>
    );
  }
} 

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.userId !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/user/home'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
