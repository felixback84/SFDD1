import React from 'react'
// mui stuff
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
// redux
import { connect } from 'react-redux'
// styles

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

// actions bar dialog
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions)

function StaticDevicePropertyDetails(props) {
    // redux props
    const {
        classes,
        
    } = props

    return (
        <>
            {/* open btn */}
            <Button variant="outlined" onClick={handleClickClose}>See details</Button>
            {/* close btn */}
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open dialog
            </Button>
            {/* dialog */}
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                {/* title bar */}
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </DialogTitle>
                {/* content */}
                <DialogContent dividers>
                    <Container
                        maxWidth={false}
                        component={Box}
                        classes={{ root: classes.containerRoot }}
                    >
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                xl={8}
                                component={Box}
                                marginBottom="3rem"
                                classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
                            >
                                <Card classes={{ root: classes.cardRoot }}>
                                    {/* vendor presentation */}
                                    <Box component={Grid} container justifyContent="center">
                                        <Grid item xs={12} lg={3}>

                                            {/* pic */}
                                            <Box position="relative">
                                                <Box
                                                    component="img"
                                                    src={
                                                        require("assets/img/theme/team-4-800x800.jpg").default
                                                    }
                                                    alt="..."
                                                    maxWidth="180px"
                                                    borderRadius="50%"
                                                    position="absolute"
                                                    left="50%"
                                                    boxShadow={boxShadows.boxShadow + "!important"}
                                                    className={classes.profileImage}
                                                />
                                            </Box>

                                            {/* semi header counters*/}
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
                                                            Connect
                                                        </Button>
                                                        <Button
                                                        variant="contained"
                                                        size="small"
                                                        classes={{ root: classes.buttonRootDark }}
                                                        >
                                                            Message
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
                                                </Grid>

                                                {/* name & location */} {/* tags */}
                                                <Box textAlign="center">
                                                    <Typography variant="h3">
                                                        Jessica Jones
                                                        <Box component="span" fontWeight="300">
                                                            , 27
                                                        </Box>
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
                                                        Bucharest, Romania
                                                    </Box>

                                                    {/* mini profile */}
                                                    <Box
                                                        component={Typography}
                                                        variant="h5"
                                                        marginTop="3rem!important"
                                                    >
                                                        Solution Manager - Creative Tim Officer
                                                    </Box>
                                                    <Box
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                        fontSize="1rem"
                                                    >
                                                        <Box
                                                            component={School}
                                                            width="1.25rem!important"
                                                            height="1.25rem!important"
                                                            marginRight=".5rem"
                                                        ></Box>
                                                        University of Computer Science
                                                    </Box>
                                                    <Box
                                                        component={Divider}
                                                        marginTop="1.5rem!important"
                                                        marginBottom="1.5rem!important"
                                                    ></Box>
                                                    <Box
                                                        component="p"
                                                        fontWeight="300"
                                                        lineHeight="1.7"
                                                        marginBottom="1rem"
                                                        fontSize="1rem"
                                                    >
                                                        Ryan — the name taken by Melbourne-raised, Brooklyn-based
                                                        Nick Murphy — writes, performs and records all of his own
                                                        music.
                                                    </Box>
                                                </Box>
                                            </Box>
                                            
                                            {/* products */}
                                            <div className={classes.relatedProducts}>
                                                <h3 className={classNames(classes.title, classes.textCenter)}>
                                                    You may also be interested in:
                                                </h3>
                                                <GridContainer>
                                                    <GridItem sm={6} md={3}>
                                                        <Card product>
                                                            <CardHeader image>
                                                                <a href="#pablo">
                                                                    <img src={cardProduct1} alt="cardProduct" />
                                                                </a>
                                                            </CardHeader>
                                                            <CardBody>
                                                                <h6
                                                                    className={classNames(
                                                                        classes.cardCategory,
                                                                        classes.textRose
                                                                    )}
                                                                >
                                                                    Trending
                                                                </h6>
                                                                <h4 className={classes.cardTitle}>Dolce & Gabbana</h4>
                                                                <div className={classes.cardDescription}>
                                                                    Dolce & Gabbana{"'"}s {"'"}Greta{"'"} tote has been
                                                                    crafted in Italy from hard-wearing red textured-leather.
                                                                </div>
                                                            </CardBody>
                                                            <CardFooter className={classes.justifyContentBetween}>
                                                                <div className={classes.price}>
                                                                    <h4>$1,459</h4>
                                                                </div>
                                                                <div className={classes.stats}>
                                                                    <Tooltip
                                                                        id="tooltip-top"
                                                                        title="Save to Wishlist"
                                                                        placement="top"
                                                                        classes={{ tooltip: classes.tooltip }}
                                                                    >
                                                                        <Button justIcon color="rose" simple>
                                                                            <Favorite />
                                                                        </Button>
                                                                    </Tooltip>
                                                                </div>
                                                            </CardFooter>
                                                        </Card>
                                                    </GridItem>
                                                </GridContainer>
                                            </div>
                                        </Grid>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>    
                </DialogContent>
                {/* actions bar */}
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
    
}

// connect to global state in redux
const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(StaticDevicePropertyDetails)
