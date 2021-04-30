import React, { Component } from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
// styles
import componentStyles from "assets/theme/views/auth/login.js";
import theme from "assets/theme/theme.js";
const styles = componentStyles


class login extends Component {

	// state
  constructor(){
    super(); 
    this.state = {
      email: '',
      password: '',
      errors: {},
    }
	}
	
	// for print in UI the errors
  componentWillReceiveProps(nextProps){
    if(nextProps.ui.errors){
			this.setState({ errors: nextProps.ui.errors });
    }
	}
	
	// event listener of fields in form
	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
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
	
	render(){
		
		// props
    const { classes, ui:{loading} } = this.props;
		const { errors } = this.state;

		return (
			<>
				<Grid item xs={12} lg={5} md={7}>
					<Card classes={{ root: classes.cardRoot }}>
						{/* sign with others */}
						<form className={classes.form} onSubmit={this.handleSubmit}>
							<CardHeader
								className={classes.cardHeader}
								title={
									<Box
										fontSize="80%"
										fontWeight="400"
										component="small"
										color={theme.palette.gray[600]}
									>
										Sign in with
									</Box>
								}
								titleTypographyProps={{
									component: Box,
									textAlign: "center",
									marginBottom: "1rem!important",
									marginTop: ".5rem!important",
									fontSize: "1rem!important",
								}}
								subheader={
									<Box textAlign="center">
										<Box
											component={Button}
											variant="contained"
											marginRight=".5rem!important"
											classes={{ root: classes.buttonRoot }}
										>
											<Box component="span" marginRight="4px">
												<Box
													alt="..."
													component="img"
													width="20px"
													className={classes.buttonImg}
													src={
														require("assets/img/icons/common/github.svg").default
													}
												></Box>
											</Box>
											<Box component="span" marginLeft=".75rem">
												Github
											</Box>
										</Box>
										<Button
											variant="contained"
											classes={{ root: classes.buttonRoot }}
										>
											<Box component="span" marginRight="4px">
												<Box
													alt="..."
													component="img"
													width="20px"
													className={classes.buttonImg}
													src={
														require("assets/img/icons/common/google.svg").default
													}
												></Box>
											</Box>
											<Box component="span" marginLeft=".75rem">
												Google
											</Box>
										</Button>
									</Box>
								}
							>
							</CardHeader>

							{/* built in login */}
							<CardContent classes={{ root: classes.cardContent }}>
								<Box
									color={theme.palette.gray[600]}
									textAlign="center"
									marginBottom="1rem"
									marginTop=".5rem"
									fontSize="1rem"
								>
									<Box fontSize="80%" fontWeight="400" component="small">
										Or be classical
									</Box>
								</Box>
								<FormControl
									variant="filled"
									component={Box}
									width="100%"
									marginBottom="1rem!important" d
								>
									{/* email field */}
									<FilledInput
										id="email"
										value={this.state.email}
										onChange={this.onChange}
										name="email"
										required
										autoComplete="off"
										type="email"
										placeholder="Email"
										startAdornment={
											<InputAdornment position="start">
												<Email />
											</InputAdornment>
										}
										error={errors.email ? true : false}
										helperText={errors.email}
									/>
								</FormControl>
								{/* password field */}
								<FormControl
									variant="filled"
									component={Box}
									width="100%"
									marginBottom="1rem!important"
								>
									<FilledInput
										id="password"
										value={this.state.password}
										onChange={this.onChange}
										name="password"
										required
										autoComplete="off"
										type="password"
										placeholder="Password"
										startAdornment={
											<InputAdornment position="start">
												<Lock />
											</InputAdornment>
										}
										error={errors.password ? true : false}
										helperText={errors.password}
									/>
									{/* errors */}
									{errors.general && (
										<Typography variant="body2" className={classes.customError}>
												{errors.general}
										</Typography>
									)}
								</FormControl>
								{/* remenber me */}
								<FormControlLabel
									value="end"
									control={<Checkbox color="primary" />}
									label="Remenber me"
									labelPlacement="end"
									classes={{
										root: classes.formControlLabelRoot,
										label: classes.formControlLabelLabel,
									}}
								/>
								{/* button submit */}
								<Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
									<Button 
										color="primary" 
										variant="contained" 
										type="submit" 
										disabled={loading}
									>
										Sign in
										{loading && (
											<CircularProgress 
												size={30}  
											/>
										)}
									</Button>
								</Box>
							</CardContent>
						</form>
					</Card>

					{/* forgot pass & new account */}
					<Grid container component={Box} marginTop="1rem">
						<Grid item xs={6} component={Box} textAlign="left">
							<a
								to="/auth/forgot"
								onClick={(e) => e.preventDefault()}
								className={classes.footerLinks}
							>
								Forgot password
							</a>
						</Grid>
						<Grid item xs={6} component={Box} textAlign="right">
							<a
								to="/auth/signup"
								onClick={(e) => e.preventDefault()}
								className={classes.footerLinks}
							>
								Create new account
							</a>
						</Grid>
					</Grid>
				</Grid>
			</>
		);
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});

export default connect(mapStateToProps,{loginUser})(withStyles(styles)(login));

