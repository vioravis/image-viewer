import React,{Component} from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Card from '@material-ui/core/Card';



	const customStyles = {
		content:{
			top:'50%',
			left:'50%',
			right:'auto',
			bottom:'auto',
			marginRight:'-50%',
			transform:'translate(-50%,-50%)'
		}

	}


	class Header extends Component {
   
    render() {
        return(
            <div>

                <header className="app-header">
               
                    <span className="logo-text">Image Viewer</span>  
				
				</header>	
            </div>
			)
		}
	}

export default Header;