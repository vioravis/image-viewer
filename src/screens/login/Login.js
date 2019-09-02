import React,{Component} from 'react';

import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";

import Header from "../../common/Header";
import "./Login.css";
import Home from "../home/Home"



const customStyles = {

    content:{
        top:'10%',
        left:'35%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform:'translate(-50,-50%)',
		width:"30%",
        height:"45%"
		
    }
    
}



const container = function(props) {

    return(
            <Typography component="div" style={{padding: 0,textAlign:'center'}}>
                {props.children}
            </Typography>
    );


}

class Login extends Component {

    constructor(){
        super();
        this.state = {
            modalIsOpen: false,
            username:"",
            userNameRequired: "dispNone",
            password:"",
            passwordRequired:"dispNone",
			 invalidUsernamePassword: "dispNone",
			 loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        }
    }

    openModalHandler = () => {
        this.setState({modalIsOpen:true})
    }

    closeModalHandler = () => {
        this.setState({modalIsOpen:false})
    }

    loginClickHandler = () => {
		this.setState({ invalidUsernamePassword: "dispNone" });
        this.state.username === "" ? this.setState({userNameRequired:"dispBlock"}):this.setState({userNameRequired:"dispNone"})
        this.state.password === "" ? this.setState({passwordRequired:"dispBlock"}):this.setState({passwordRequired:"dispNone"})
		
		if (this.state.username === "uname" && this.state.password === "pword") {
		
			sessionStorage.setItem("username", "admin");
			sessionStorage.setItem("access-token","8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
			this.setState({ loggedIn: true });
			this.navigateToHome();
		} else if (this.state.username !== "" && this.state.password !== "") {
			this.setState({ invalidUsernamePassword: "dispBlock" });
		}
    }
	
	navigateToHome = () => {
        //const { history } = this.props
        this.props.history.push("/home");
        //history.push("Home")
	};

    inputUsernameChangeHandler = (e) => {
        this.setState({username:e.target.value})
    }

    passwordChangeHandler = (e) => {
        this.setState({password:e.target.value})
    }

    render() {
        return(
            <div>

             <header className="app-header">
               
                    <span className="logo-text">Image Viewer</span>  
					
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModalHandler}>
                            Login
                        </Button>

					
                        <Modal ariaHideApp={false} 
                        isOpen={this.state.modalIsOpen} 
                        contentLabel="Login"
                        onRequestClose={this.closeModalHandler}
                        style={customStyles}
                        >

                            <Card className="no-border" >
                                
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
                            </Card>  
							</Modal>
						
						
                            
					</div>
   	
                    
		
			</header>	
            </div>
        )
    }
}

export default Login;