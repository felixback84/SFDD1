import React, { Component } from "react";
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// icons
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Typography from '@material-ui/core/Typography';
import Email from "@material-ui/icons/Email";
import LockIcon from '@material-ui/icons/Lock';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
// styles
import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";
import image from "assets/img/bg7.jpg";
const useStyles = loginPageStyle;

class login extends Component {
  // state
  constructor(){
    super(); 
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
    // to fields
    this.onChangeEmail = this.onChangeEmail
    this.onChangePassword = this.onChangePassword
  }

  // for print in UI the errors
  componentWillReceiveProps(nextProps){
    if(nextProps.ui.errors){
        this.setState({ errors: nextProps.ui.errors });
    }
  }

  // callback of submit
  handleSubmit = (event) => {
      event.preventDefault();
      const userData = {
          email: this.state.email,
          password: this.state.password
      };
      this.props.loginUser(userData, this.props.history); 
  };
 
  // event listener of fields in form
  onChangeEmail = (email) => {this.setState({ email })}
  onChangePassword = (password) => {this.setState({ password })}

  render(){

    // props
    const { classes, ui:{loading} } = this.props;
    const { errors } = this.state;

    return (

      <div>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card >
                  <form className={classes.form} onSubmit={this.handleSubmit}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                      {/* social login methods */}
                      <div className={classes.socialLine}>
                        <Button
                          round
                          justIcon
                          target="_blank"
                          color="facebook"
                          className={classes.iconButtons}
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                        <Button
                          round
                          justIcon
                          target="_blank"
                          color="google"
                          className={classes.iconButtons}
                          onClick={e => e.preventDefault()}
                        >
                          <i className={"fab fa-google"} />
                        </Button>
                      </div>
                    {/* custom login */}
                    </CardHeader>
                    <p className={classes.description + " " + classes.textCenter}>
                      Or Be Classical
                    </p>
                    <CardBody>
                      <CustomInput
                        valueField={this.onChangeEmail}
                        labelText="Email..."
                        id="email"
                        name="email" 
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "email",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        valueField={this.onChangePassword}
                        labelText="Password"
                        id="password"
                        name="password"
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon className={classes.inputIconsColor}>
                                <LockIcon className={classes.inputIconsColor}/>
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off"
                        }}
                      />
                    </CardBody>
                    {/* submit button */}
                    <CardFooter className={classes.cardFooter + " " + classes.textCenter}>
                      {/* errors report */}
                      {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                          {errors.general}
                        </Typography>
                      )}
                      <Button 
                        type="submit"
                        round 
                        color="primary"
                        disabled={loading}
                      >
                        Get started
                        {loading && (
                          <CircularProgress 
                            size={30}  
                          />
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});

// connect to action in redux
const mapsActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapsActionsToProps)(withStyles(useStyles)(login));