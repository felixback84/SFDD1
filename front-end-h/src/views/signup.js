/*eslint-disable*/
import React, { Component } from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import LockIcon from '@material-ui/icons/Lock';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';
// styles
import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.js";
import image from "assets/img/bg7.jpg";
const useStyles = signupPageStyle;


class signup extends Component{
  // state
  constructor(){
    super();
    this.state = {
        email: '',
        password: '',
        type: '',
        confirmPassword: '',
        userHandle: '',
        errors: {},
        ////////////////// UX
        checked:[], 
        setChecked:[],
    }

    // to hold fields
    this.onChangeEmail = this.onChangeEmail
    this.onChangeUserHandle = this.onChangeUserHandle
    this.onChangePassword = this.onChangePassword
    this.onChangeConfirmPassword = this.onChangeConfirmPassword
  }  

  // to map errors
  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
        this.setState({ errors: nextProps.ui.errors });
    }
  }

  // to send to the server
  handleSubmit = (event) => {
    event.preventDefault(); 
    this.setState({
        loading: true
    });
    // data to send
    const newUserData = {
        email: this.state.email,
        userHandle: this.state.userHandle,
        type: this.state.type,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
    };
    // redux trigger
    this.props.signupUser(newUserData, this.props.history);
  };

  // event listener of fields in form
  onChangeEmail = (email) => {this.setState({ email })}
  onChangeUserHandle = (userHandle) => {this.setState({ userHandle })}
  onChangeTypeOfUser = (type) => {this.setState({ type })}
  onChangePassword = (password) => {this.setState({ password })}
  onChangeConfirmPassword = (confirmPassword) => {this.setState({ confirmPassword })}

  // select
  handleTypeOfUSer = event => {
    this.onChangeTypeOfUser(event.target.value);
  };

  // to the toggle
  handleToggle = (value) => {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({
      setChecked: newChecked
    });
  };


  render(){

    // props
    const { classes, ui:{loading} } = this.props;
    const { errors } = this.state;

    return (
      <div>
        {/* background */}
        <div
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={10} md={10}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>Signup</h2>
                  <CardBody>
                    <GridContainer justify="center">
                      {/* relevant data */}
                      <GridItem xs={12} sm={5} md={5}>
                        <InfoArea
                          className={classes.infoArea}
                          title="IoT Stuff"
                          description="Is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                          icon={Timeline}
                          iconColor="rose"
                        />
                        <InfoArea
                          className={classes.infoArea}
                          title="Cloud Based"
                          description="Is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
                          icon={Code}
                          iconColor="primary"
                        />
                        <InfoArea
                          className={classes.infoArea}
                          title="Built Audience"
                          description="Is simply dummy text of the printing and typesetting industry. 
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
                          icon={Group}
                          iconColor="info"
                        />
                      </GridItem>
                      {/* social signup */}
                      <GridItem xs={12} sm={5} md={5}>
                        <div className={classes.textCenter}>
                          <Button justIcon round color="google">
                            <i className={classes.socials + " fab fa-google"} />
                          </Button>
                          {` `}
                          <Button justIcon round color="facebook">
                            <i
                              className={classes.socials + " fab fa-facebook-f"}
                            />
                          </Button>
                          {` `}
                          <h4 className={classes.socialTitle}>or be classical</h4>
                        </div>
                        {/* register clasical form */}
                        <form className={classes.form} onSubmit={this.handleSubmit}>
                          {/* email */}
                          <CustomInput
                            valueField={this.onChangeEmail}
                            labelText="Email..."
                            id="email"
                            name="email" 
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              type: "email",
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Email className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                              ),
                              placeholder: "Email..."
                            }}
                          />
                          {/* username */}
                          <CustomInput
                            valueField={this.onChangeUserHandle}
                            id="userHandle" 
                            name="userHandle" 
                            type="text" 
                            labelText="userHandle" 
                            className={classes.textField} 
                            helperText={errors.userHandle}
                            error={errors.userHandle ? true : false}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              type: "text",
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <Face className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                              ),
                              placeholder: "Username"
                            }}
                          />
                          {/* type of device */}
                          <FormControl fullWidth className={classes.selectFormControl}>
                            <InputLabel
                                htmlFor="simple-select"
                                className={classes.selectLabel}
                            >
                                Type of user
                            </InputLabel>
                            <Select
                                MenuProps={{
                                className: classes.selectMenu
                                }}
                                classes={{
                                select: classes.select
                                }}
                                value={this.state.type}
                                onChange={this.handleTypeOfUSer}
                                inputProps={{
                                name: "type",
                                id: "type"
                                }}
                            >
                                <MenuItem
                                    disabled
                                    classes={{
                                        root: classes.selectMenuItem
                                    }}
                                    >
                                    Type of user
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value="static"
                                    >
                                    static
                                </MenuItem>
                                <MenuItem
                                    classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                    }}
                                    value="dynamic"
                                    >
                                    dynamic
                                </MenuItem>
                            </Select>
                          </FormControl>
                          {/* password */}
                          <CustomInput
                            valueField={this.onChangePassword}
                            labelText="Password"
                            id="password"
                            name="password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              type: "password",
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <LockIcon className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                              ),
                              placeholder: "Password"
                            }}
                          />
                          {/* confrim password */}
                          <CustomInput
                            valueField={this.onChangeConfirmPassword}
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            labelText="Confirm Password" 
                            className={classes.textField} 
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses
                            }}
                            inputProps={{
                              type: "password",
                              startAdornment: (
                                <InputAdornment
                                  position="start"
                                  className={classes.inputAdornment}
                                >
                                  <LockIcon className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                              ),
                              placeholder: "Confirm password"
                            }}
                          />
                          {/* terms and conditions */}
                          <FormControlLabel
                            classes={{
                              label: classes.label
                            }}
                            control={
                              <Checkbox
                                tabIndex={-1}
                                onClick={() => this.handleToggle(1)}
                                checkedIcon={
                                  <Check className={classes.checkedIcon} />
                                }
                                icon={<Check className={classes.uncheckedIcon} />}
                                classes={{
                                  checked: classes.checked,
                                  root: classes.checkRoot
                                }}
                                checked={this.state.checked.indexOf(1) !== -1 ? true : false}
                              />
                            }
                            label={
                              <span>
                                I agree to the{" "}
                                <a href="#pablo">terms and conditions</a>.
                              </span>
                            }
                          />
                          {/* final button */}
                          <div className={classes.textCenter}>
                            <Button 
                              round 
                              color="primary"
                              type="submit"
                              disabled={loading}
                            >
                              Get started
                              {loading && (
                                <CircularProgress 
                                  size={30}  
                                />
                              )}
                            </Button>
                          </div>
                        </form>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }  
}

// redux state
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});

export default connect(mapStateToProps,{signupUser})(withStyles(useStyles)(signup));
