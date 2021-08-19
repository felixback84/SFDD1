import React  from 'react'
// mui stuff
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles'
import Avatar from "@material-ui/core/Avatar";
import Container from '@material-ui/core/Container'
import { Grid, Divider } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import { CardHeader, CardContent } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Box from "@material-ui/core/Box"
import { Tooltip } from '@material-ui/core';
// nodejs library that concatenates classes
import classNames from "classnames"
// icons
import LocationOn from '@material-ui/icons/LocationOn'
// social icons
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import YouTubeIcon from '@material-ui/icons/YouTube'
import InstagramIcon from '@material-ui/icons/Instagram'

// components
import ProductsByTop5Tag from './ProductsByTop5Tag'
import TagsMaker from '../../components/utils/TagsMaker'

// redux
import { connect } from 'react-redux'
import { findSpecificTop5Tag } from '../../../../redux/actions/top5TagsActions'
import { userDeviceSpecificTop5ProductsSyncData } from '../../../../redux/actions/productsActions'
// styles
import componentStyles from "assets/theme/views/admin/staticDevicePropertyDetails.js"
const useStyles = makeStyles(componentStyles)

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },      
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

// title dialog
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    )
})

// content dialog
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent)


const StaticDevicePropertyDetails = (props) => {

    // open & close state
    const [open, setOpen] = React.useState(false)

    // styles
    const classes = useStyles();
	const theme = useTheme();

    // vars
    const userDeviceId = props.userDevices[0].userDeviceId
    const top5TagId = props.top5tagid
    const thingId = props.thingid

    // to open
    const handleClickOpen = () => {
        // print
        console.log({userDeviceId},{top5TagId},{thingId})
        setOpen(true)
        // get top5Tag ux
        props.findSpecificTop5Tag(userDeviceId,top5TagId)
        // get products ux
        props.userDeviceSpecificTop5ProductsSyncData(thingId)
    }

    // to close
    const handleClickClose = () => {
        setOpen(false)
    }

    // redux props
    const {
        //classes,
        top5TagUx:{
            coords:{
                hash,
                nameOfPoint,
                lat,
                lon
            },
            matchDataResults,
            meters,
            //thingId,
            userCredentials:{
                bio,
                companyName,
                email,
                imgUrl,
                lastname,
                names,
                type,
                userHandle
            }
        },
    } = props
    
    return (
        <>
            {/* open btn */}
            <Button 
                variant="outlined" 
                onClick={handleClickOpen}
            >
                See details
            </Button>
            {/* dialog */}
            <Dialog onClose={handleClickClose} aria-labelledby="customized-dialog-title" open={open}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="1rem"
                >
                    <Box
                        component={Typography}
                        variant="h5"
                        marginTop="0.5rem!important"
                    >
                        Tags: 
                    </Box>
                </Box>
                {/* title tags bar */}
                <DialogTitle id="customized-dialog-title" onClose={handleClickClose}>
                    <TagsMaker data={matchDataResults}/>
                </DialogTitle>

                {/* content */}
                <DialogContent dividers>
                    {/* <Container
                        maxWidth={false}
                        component={Box}
                        classes={{ root: classes.containerRoot }}
                    > */}
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                xl={12}
                                component={Box}
                                marginBottom="3rem"
                                classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
                            >
                                <Card classes={{ root: classes.cardRoot }}>
                                    {/* vendor presentation */}
                                    <Box component={Grid} container justifyContent="center">
                                        <Grid item xs={12} lg={12}>

                                            {/* pic */}
                                            <Box position="relative">
                                                <Box
                                                    component="img"
                                                    src={imgUrl}
                                                    alt="..."
                                                    maxWidth="180px"
                                                    borderRadius="50%"
                                                    position="absolute"
                                                    left="50%"
                                                    boxShadow={classes.cardRoot.boxShadow + "!important"}
                                                    className={classes.profileImage}
                                                />
                                            </Box>

                                            {/* semi header counters */}
                                            <Box
                                                component={CardHeader}
                                                border="0!important"
                                                textAlign="center"
                                                paddingBottom="0!important"
                                                paddingTop="8rem!important"
                                                classes={{ root: classes.cardHeaderRootProfile }}
                                                subheader=
                                                {
                                                    <Box display="flex" justifyContent="space-between">
                                                        <Button
                                                        variant="contained"
                                                        size="small"
                                                        classes={{ root: classes.buttonRootInfo }}
                                                        >
                                                            {meters}
                                                        </Button>
                                                        <Button
                                                        variant="contained"
                                                        size="small"
                                                        classes={{ root: classes.buttonRootDark }}
                                                        >
                                                            {hash}
                                                        </Button>
                                                    </Box>
                                                }
                                            >
                                            </Box>
                                            
                                            {/* various counters */}
                                            <Box
                                                component={CardContent}
                                                classes={{ root: classes.ptMd4 }}
                                                paddingTop="0!important"
                                            >
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Box
                                                            padding="1rem 0"
                                                            justifyContent="center"
                                                            display="flex"
                                                            className={classes.mtMd5}
                                                        >
                                                            {/* counter one */}
                                                            <Box
                                                                textAlign="center"
                                                                marginRight="1rem"
                                                                padding=".875rem"
                                                            >
                                                                <Box
                                                                    component="span"
                                                                    fontSize="1.1rem"
                                                                    fontWeight="700"
                                                                    display="block"
                                                                    letterSpacing=".025em"
                                                                    className={classes.typographyRootH6}
                                                                >
                                                                    22
                                                                </Box>
                                                                <Box
                                                                    component="span"
                                                                    fontSize=".875rem"
                                                                    color={theme.palette.gray[500]}
                                                                >
                                                                    Friends
                                                                </Box>
                                                            </Box>

                                                            {/* counter two */}
                                                            <Box
                                                                textAlign="center"
                                                                marginRight="1rem"
                                                                padding=".875rem"
                                                            >
                                                                <Box
                                                                    component="span"
                                                                    fontSize="1.1rem"
                                                                    fontWeight="700"
                                                                    display="block"
                                                                    letterSpacing=".025em"
                                                                    className={classes.typographyRootH6}
                                                                >
                                                                    10
                                                                </Box>
                                                                <Box
                                                                    component="span"
                                                                    fontSize=".875rem"
                                                                    color={theme.palette.gray[500]}
                                                                >
                                                                    Photos
                                                                </Box>
                                                            </Box>

                                                            {/* counter three */}
                                                            <Box 
                                                                textAlign="center" 
                                                                padding=".875rem"
                                                            >
                                                                <Box
                                                                    component="span"
                                                                    fontSize="1.1rem"
                                                                    fontWeight="700"
                                                                    display="block"
                                                                    letterSpacing=".025em"
                                                                    className={classes.typographyRootH6}
                                                                >
                                                                    89
                                                                </Box>
                                                                <Box
                                                                    component="span"
                                                                    fontSize=".875rem"
                                                                    color={theme.palette.gray[500]}
                                                                >
                                                                    Comments
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        {/* companyName */} 
                                                        <Box textAlign="center">
                                                            <Typography variant="h3">
                                                                {companyName}
                                                            </Typography>
                                                            <Box
                                                                component={Typography}
                                                                variant="h5"
                                                                fontWeight="300!important"
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                            >
                                                                <Box
                                                                    component={LocationOn}
                                                                    width="1.25rem!important"
                                                                    height="1.25rem!important"
                                                                ></Box>
                                                                Location: Bogotá D.C, Colombia
                                                            </Box>

                                                            {/* bio */}
                                                            <Box
                                                                component="p"
                                                                fontWeight="300"
                                                                lineHeight="1.7"
                                                                marginBottom="1rem"
                                                                fontSize="1rem"
                                                            >
                                                                {bio}
                                                            </Box>

                                                            {/* social links */}
                                                            <Box
                                                                component={Divider}
                                                                marginTop="1.5rem!important"
                                                                marginBottom="1.5rem!important"
                                                            ></Box>
                                                            <Box
                                                                component={TwitterIcon}
                                                                width="1.5rem!important"
                                                                height="1.5rem!important"
                                                            ></Box>
                                                            <Box
                                                                component={LinkedInIcon}
                                                                width="1.5rem!important"
                                                                height="1.5rem!important"
                                                            ></Box>
                                                            <Box
                                                                component={YouTubeIcon}
                                                                width="1.5rem!important"
                                                                height="1.5rem!important"
                                                            ></Box>
                                                            <Box
                                                                component={InstagramIcon}
                                                                width="1.5rem!important"
                                                                height="1.5rem!important"
                                                            ></Box>

                                                            {/* mini profile */}
                                                            <Box
                                                                component={Divider}
                                                                marginTop="1.5rem!important"
                                                                marginBottom="1.5rem!important"
                                                            ></Box>

                                                            <Box
                                                                component={Typography}
                                                                variant="h3"
                                                                marginTop="3rem!important"
                                                            >
                                                                Ask for: 
                                                            </Box>

                                                            {/* avatar */}
                                                            <Avatar
                                                                classes={{ root: classes.avatarLarge }}
                                                                alt="..."
                                                                src={
                                                                    require("assets/img/theme/team-1-800x800.jpg")
                                                                        .default
                                                                }
                                                            />

                                                            {/* names */}
                                                            <Box
                                                                component={Typography}
                                                                variant="h5"
                                                                marginTop="3rem!important"
                                                            >
                                                                {`${names} ${lastname}`} 
                                                            </Box>

                                                            {/* role */}
                                                            <Box
                                                                display="flex"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                fontSize="1rem"
                                                            >
                                                                Sales Agent
                                                            </Box>

                                                            <Box
                                                                component={Divider}
                                                                marginTop="1.5rem!important"
                                                                marginBottom="1.5rem!important"
                                                            ></Box>

                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                            {/* products */}
                                            <div className={classes.relatedProducts}>
                                                <h3 className={classNames(classes.title, classes.textCenter)}>
                                                    Their products:
                                                </h3>
                                                {/* arr Products */}
                                                <ProductsByTop5Tag 
                                                    top5productsux={props.top5ProductsUx}
                                                />
                                            </div>    
                                        </Grid>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    {/* </Container>     */}
                </DialogContent>
            </Dialog>
        </>
    )
} 

// connect to global state in redux
const mapStateToProps = (state) => ({
    top5TagUx:state.top5Tags1.top5TagUx,
    userDevices:state.userDevices1.userDevices,
    top5ProductsUx:state.products1.top5ProductsUx
})

export default connect(mapStateToProps,{findSpecificTop5Tag,userDeviceSpecificTop5ProductsSyncData})(StaticDevicePropertyDetails)
