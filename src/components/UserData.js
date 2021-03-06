import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Radio, { RadioGroup } from "material-ui/Radio";
import { FormLabel, FormControl, FormControlLabel, FormHelperText} from "material-ui/Form";
import { DatePicker } from "material-ui-pickers";
import Typography from "material-ui/Typography/Typography";
import moment from "moment";
import { signup } from "../actions/signup";
import { connect } from "react-redux";
import Avatar from "./skypeAvatar";

const styles = theme => ({
  container: {
    width: "50%",
    margin: "7% auto",
    textAlign: "center"
  },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "0 auto",
    alignItems: "stretch",
    textAlign: "center"
  },
  Paper: {
    width: "80%",
    margin: "8% auto"
  },
  textField: {
    marginBottom: 20,
    width: "100%",
    
  },

  p: {
    color: "#777777"
  },

  RadioGroupWrapper: {
    display: "flex",
    marginBottom: 10,
    position: "relative",
    left: "-15px"
  },

  h3: {
    color: "#000000"
  },
  Typography: {
    fontSize: "20px",
    marginTop: 10
  },
  DatePicker: {
    float: "left",
    marginBottom: 30,
    width: 250
  },
  RadioGroup: {
    display: "inline-block",
    textAlign: "left",
    marginBottom: 20
  },
  FormControl: {
    textAlign: "left"
  },

  button: {
    marginBottom: 30,
    width: 200
  },
  text: {
    color: "black"
  }
});

class UserData extends Component {
  constructor() {
    super();
    this.state = {
      
      dateOfBirth: moment(),
      formTitle: "Sing Up",
      buttonTitle: "Sing Up",
      settingUserData: {
        firstName: "john",
        lastName: "Doe",
        email: "johnDoe@gmail.com",
        password: "******",
        newPassword: "newPasssword"
      },
      newUser:{
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        newPassword:'',
        dateOfBirth:'',
        gender:''

      },
      generalerror:' ',
      errorMessageFirstName:' ',
      errorMessagelastName: ' ',
      errorMessagePassword:' ',
      errorMessageEmail:'',
      errorMessagedateOfBirth:'',
      errorMessagerepeatPassword:'',
      errorMessageGender:'',
      // firstNameRequired:false,
      // lastNameRequired:false,
      // emailRequired:false,
      // emailValid: false,
      // emailTaken:false,
      // passwordRequired:false,
      // repasswordRequired:false,
      // dateOfBirthRequird:false,
      // genderRequired:false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isRequierd = this.isRequierd.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleDataChange = date => {
    let checketDate = date.format().substring(0, 10);
    console.log("date", checketDate);
    this.setState({
      newUser: { ...this.state.newUser, dateOfBirth: checketDate }
    });
  };

  isRequierd(formData){
    let bool = true;
     this.setState({
      errorMessageFirstName:' ',
      errorMessagelastName: ' ',
      errorMessagePassword:' ',
      errorMessageEmail:'',
      errorMessagedateOfBirth:''
     })

     if(this.state.newUser === undefined){
       console.log('form')
       this.setState({
        errorMessage:'please fill the Requireds filed'
      })
       bool = false;
     }
     //||  || this.state.newUser.dateOfBirth || this.state.newUser.password || || this.state.newUser.dateOfBirth
      if(this.state.newUser.firstName  === '') {
      console.log('form field')
      this.setState({
        errorMessageFirstName:'please fill first name'
      })
      bool = false;
     }

     
     if(this.state.newUser.lastName === ''){
      console.log('form last name')
      this.setState({
        errorMessagelastName:'please fill last name'
      })
      bool = false; 
     } 
     if(this.state.newUser.password  === ''){
      console.log('form passwoer')
      this.setState({
        errorMessagePassword:'please insert password'
      })
      bool = false;
    } 
    if(this.state.newUser.email  === ''){
      console.log('form email')
      this.setState({
        errorMessageEmail:'please insert your email address'
      })
      bool = false;
    } 
    if(this.state.newUser.newPasssword  === ''){
      console.log('form repeat password')
      this.setState({
        errorMessagerepeatPassword:'please repeat your password '
      })
      bool = false;
    }
    if(this.state.newUser.dateOfBirth  === ''){
      console.log('form dateOfBirth')
      this.setState({
        errorMessagedateOfBirth:'please choose your dateOfBirth '
      })
      bool = false;
   }
   if(this.state.newUser.gender  === ''){
    console.log('form gender')
    this.setState({
      errorMessageGender:'please choose your gender '
    })
    bool = false;
   }
     return bool;
  }
  
  handleChange = (e,value) =>{
    console.log(value)
    this.setState({
      newUser:{
        ...this.state.newUser,
        gender:value
      }
    })
  } 
  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      newUser: {
        ...this.state.newUser,
        [name]: value
      }
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.newUser);
    let formData = this.state.newUser;
    let url = "http://localhost:3001/auth/signup";

    console.log(this.isRequierd(formData));

    if(this.isRequierd(formData)){
      
        const searchParams = Object.keys(formData).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
        }).join('&');
        console.log(searchParams);
        fetch(url, {
          CORS:'disabled',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: searchParams
        })
        .join("&");
      console.log(searchParams);
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: searchParams
      })
        .then(res => res.json())
        .then(data => {
          console.dir(data);
          if (data.success) {
            this.props.history.push("/wellcome");
          } else {
            this.setState({
              generalerror:data.message
            })
            console.log(data)
          }
        })
        .catch(err=>console.log(err));
    }else{
      console.log('registration error')
      //Handle errors here...
    } 
  }

  componentWillMount() {
    if (this.props.place === "setting") {
      this.setState({
        formTitle: "setting",
        buttonTitle: "save"
      });
    } else {
      this.setState({
        settingUserData: {
          firstName: "FirstName",
          lastName: "LastName",
          email: "Email Adress",
          password: "password",
          newPassword: "repeat password"
        }
      });
    }
  }  
 
    
    render(){
        const {classes} = this.props;

        return(
          <div className="main-container">
           <div className={classes.avatar}>
            <Avatar avatar={'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png'} size={80} />
           </div>
            <h3 className="sign-in-header">Sign up</h3>
            <div className="sign-in-details">
             <form className={classes.formWrapper} noValidate autoComplete='off' onSubmit={this.handleSubmit.bind(this)}>
                <TextField 
                    id='firstName'
                    className={classes.textField}
                    label={this.state.settingUserData.firstName}
                    onChange={this.handleInputChange}
                    name='firstName'
                    helperText={this.state.errorMessageFirstName }
                    
                />
                 
                <TextField
                    id='lastName'
                    className={classes.textField}
                    label={this.state.settingUserData.lastName}
                    onChange={this.handleInputChange}
                    name='lastName'
                    helperText={this.state.errorMessagelastName }
                />
                
                <TextField
                    id='email'
                    className={classes.textField}
                    label={this.state.settingUserData.email}
                    onChange={this.handleInputChange}
                    name='email'
                    helperText={this.state.errorMessageEmail}
                    
                />
                <TextField
                    id='password'
                    className={classes.textField}
                    label={this.state.settingUserData.password}
                    onChange={this.handleInputChange}
                    name='password'
                    helperText={this.state.errorMessagePassword }
                />
                <TextField 
                    id='newPassword'
                    className={classes.textField}
                    label={this.state.settingUserData.newPassword}
                    onChange={this.handleInputChange}
                    name='newPassword'
                    helperText={this.state.errorMessagerepeatPassword}
                    
                />
                <div className='picker'>
                    <Typography type='caption' align='left' gutterBottom className={classes.Typography} >
                        Date of Birth
                    </Typography>
                    <DatePicker
                        keyboard
                        value={this.state.selectedDate}
                        labelFunc={date => moment(date).format('Do MMMM YYYY')}
                        onChange={this.handleDataChange}
                        className={classes.DatePicker}
                        helperText={this.state.errorMessagedateOfBirth }
                        
                    />
                </div>
                <FormControl component='fieldset' className={classes.FormControl}>
                    <FormLabel component='legend'>Gender</FormLabel>
                    <RadioGroup
                        
                        aria-label='gender'
                        value={this.state.newUser.gender}
                        onChange={this.handleChange}
                        className={classes.RadioGroup}
                    >
                        <FormControlLabel value='male' control={<Radio />} label='Male' />
                        <FormControlLabel value='female' control={<Radio />} label='Female' />
                        <FormControlLabel value='other' control={<Radio />} label='Other' />
                    </RadioGroup>
                    <FormHelperText>{this.state.errorMessageGender}</FormHelperText>
                </FormControl>
                <Button type="submit" className="login-button">
                    {this.state.buttonTitle}
                </Button>
                <div><p className={classes.text}>{this.state.generalerror}</p></div>
              </form>
            </div>
          
        </div>
    
    );
  }
}

export default withStyles(styles)(connect(null, { signup })(UserData));
