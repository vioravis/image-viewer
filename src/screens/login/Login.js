import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";

import Header from "../../common/Header";
import "./Login.css";

const customStyles = {

    content:{
        top:'30%',
        left:'35%',
        right:'35%',
        bottom:'auto',
        marginRight:'-30%',
        transform:'translate(-50,-50%)',
		width:"40%",
        height:"70%"
		
    },
	
	card: {
    padding: "15px",
    position: "relative",
    top: "90px",
    left: "50%",
    width:"40%",
    height:"70%",
    transform: "translateX(-50%)"
  }
    
}



class Login extends Component {

    constructor(){
        super();
        this.state = {
            username:"",
            userNameRequired: "dispNone",
            password:"",
            passwordRequired:"dispNone",
			invalidUsernamePassword: "dispNone",
			loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    loginClickHandler = () => {
		this.setState({ invalidUsernamePassword: "dispNone" });
        this.state.username === "" ? this.setState({userNameRequired:"dispBlock"}):this.setState({userNameRequired:"dispNone"})
        this.state.password === "" ? this.setState({passwordRequired:"dispBlock"}):this.setState({passwordRequired:"dispNone"})
		
		if (this.state.username === "uname" && this.state.password === "pword") {
		
			sessionStorage.setItem("username", "uname");
			sessionStorage.setItem("access-token","8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
			this.setState({ loggedIn: true });
			this.navigateToHome();
		} else if (this.state.username !== "" && this.state.password !== "") {
			this.setState({ invalidUsernamePassword: "dispBlock" });
		}
    }
	
	navigateToHome = () => {       
        this.props.history.push("/home");       
	};

    inputUsernameChangeHandler = e => {
        this.setState({username:e.target.value})
    }

    passwordChangeHandler = e => {
        this.setState({password:e.target.value})
    }

    render() {
        return(
            <div>

             <Header screen={"Login"} />
               
                    
					
                    <div >
                            <Card style={customStyles.card}>
                            
                            <CardContent>
							
                                
                                <p className="login-text">LOGIN</p>

                                <FormControl required>
                                    <InputLabel htmlFor="username"> Username </InputLabel>    
                                    <Input className="text-box" id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler}></Input>
                                    <FormHelperText className={this.state.userNameRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>    
                                </FormControl>  
								
                                <br></br>

                                <FormControl required>
                                    <InputLabel htmlFor="password"> Password </InputLabel>    
                                    <Input className="text-box" id="password" type="password" password={this.state.password} onChange={this.passwordChangeHandler}></Input>    
                                    <FormHelperText className={this.state.passwordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
								
								<br></br>
								
								<div className={this.state.invalidUsernamePassword}>
										<span className="red"> Incorrect username and/or password </span>
								</div>
                                
								<br></br>    
                                
								<Button variant="contained" color="primary" onClick={this.loginClickHandler}>
                                
								LOGIN
                                </Button>  

                                </CardContent>          
                            
							</Card>  
								                            
					</div>
   	
                    
		
			
            </div>
        )
    }
}

export default Login;
