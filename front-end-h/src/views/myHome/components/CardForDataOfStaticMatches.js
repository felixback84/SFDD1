import React, { Component } from 'react'
// mui stuff
import { withStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Muted from "components/Typography/Muted.js";
// styles
import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
const useStyles = teamsStyle;
 
class CardForDataOfStaticMatches extends Component {
	render() {
		const {
			classes,
			credentials
		} = this.props
		return ( 
			<div>
				<Card profile>
					<CardAvatar profile plain>
						<a href="#pablo" onClick={e => e.preventDefault()}>
							<img src={credentials.userHandle} alt={credentials.imagUrl} className={classes.img} />
						</a>
					</CardAvatar>
					<CardBody>
						<h4 className={classes.cardTitle}>{credentials.companyName}</h4>
						<Muted>
							<h4 className={classes.cardCategory}>{credentials.names} {credentials.lastname}</h4>
						</Muted>
						<p className={classes.description}>
							{credentials.bio}
						</p>
					</CardBody>
					<CardFooter profile className={classes.justifyContent}>
						<Button
							href="#pablo"
							justIcon
							simple
							color="facebook"
							className={classes.btn}
							onClick={e => e.preventDefault()}
						> 
							<i className="fab fa-facebook" />
						</Button>
						<Button
							href="#pablo"
							justIcon
							simple
							color="dribbble"
							className={classes.btn}
							onClick={e => e.preventDefault()}
						>
							<i className="fab fa-dribbble" />
						</Button>
					</CardFooter>
				</Card>
			</div>
		)
	}
}

export default (withStyles(useStyles)(CardForDataOfStaticMatches));
