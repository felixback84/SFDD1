import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
// mui stuff
import { styled } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
// icons
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// components
import ColorMtsAvatar from "../../components/utils/ColorMtsAvatar"
import TagsMaker from "../../components/utils/TagsMaker"
import SwitchToSelectProductsModeThree from "../../components/modeFive/SwitchToMarkFromModeThreeToModeFive"
// Redux stuff
import { connect } from 'react-redux'

// title bar
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))

// content
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {   
                onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null
            }   
        </DialogTitle>
    )
}

// styles
const styles = (theme) => ({
    
})

class ProductsResultsTempSearchingModeThree extends Component {

    // state
	constructor(props) {
		super(props)
		this.state = {
            open:false,
            listOfIdsSelected:[]
        }
        // to open/close
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
	}

    // make of the taxo an ux
    taxoToListOfCategoriesAndTags(taxo){
        // vars to hold keys and values
        let arrOfKeys = Object.keys(taxo)
        let arrOfValues = Object.values(taxo)
        // loop
        return arrOfKeys.map((key,i)=>{
            return(
                <>
                    <p>{key}:<span>{arrOfValues[i]}</span></p>
                </>
            )
        })
    }

    // create the list of nodes
    arrTop5Products(arrTop5Products){
        // var to hold the list of nodes
        let arr = []
        // loop
        arrTop5Products.map((arrTop5Product,i)=>{
            // arr push
            arr.push(
                <>
                    <Card sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                            <CardMedia 
                                component="img"
                                sx={{ width: 200 }}
                                image={arrTop5Product.imgUrl}
                                alt="Live from space album cover"
                            />

                            <CardContent sx={{ flex: '1 0 auto' }}>
                                {/* comapany avatar */}
                                <Avatar aria-label="recipe">
                                    <ColorMtsAvatar
                                        companyname={arrTop5Product.companyName}
                                    />
                                </Avatar>
                                {/* marker to track */}
                                <SwitchToSelectProductsModeThree
                                    id={arrTop5Product.productId}
                                    staticdeviceproperty={arrTop5Product.staticDeviceProperty}
                                />
                                {/* price */}
                                <Typography component="div" variant="h2">
                                    {arrTop5Product.price}
                                </Typography>
                                {/* name of product */}
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {arrTop5Product.name}
                                </Typography>
                                {/* name of product */}
                                <Typography component="div" variant="subtitle2">
                                    {arrTop5Product.description}
                                </Typography>
                                {/* tags */}
                                <Typography component="div" variant="h4">
                                    <TagsMaker
                                        data={arrTop5Product.tags}
                                    />
                                </Typography>
                                
                            </CardContent>
                        </Box>
                    </Card>
                </>
            )
        })
        return arr
    }

    // to open dialog
    handleOpen(){
        this.setState({
            open:true
        })
    }

    // to close dialog
    handleClose(){
        this.setState({
            open:false
        })
    }

    // to send final array with the products id
    arrToSendWithProductsIds(){
        
    }
    
    render() {
        
        // redux state & style
        const {
            classes,
            // top5Products
            loading,
            top5Products,
            top5ProductsListener,
            top5ProductsUI
        } = this.props

        // data to pass
        // const dataOfTop5ProductsToPass = top5ProductsListener.length != 0 ? top5ProductsListener : top5Products
        // const dataOfTop5ProductsToPass = top5ProductsUI.length != 0 ? top5ProductsUI : top5Products
        const dataOfTop5ProductsToPass = top5ProductsUI 
        // console.log({dataOfTop5ProductsToPass})
        
        return (
            <>
                {/* arr of products */}
                <div>
                    <Grid container >
                        {/* header */}
                        <Grid item xs={12}>
                            {/* button products result */}
                            <Badge 
                                badgeContent={4} 
                                color="primary"
                            >
                                <IconButton  
                                    aria-label="upload picture" 
                                    component="span" 
                                    onClick={this.handleOpen}
                                >
                                    <ProductionQuantityLimitsIcon 
                                        fontSize="large"
                                    />
                                </IconButton>
                            </Badge>
                        </Grid> 
                        {/* content */}
                        <Grid item xs={12}>
                            <BootstrapDialog
                                onClose={this.handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={this.state.open}
                            >
                                {/* title */}
                                <BootstrapDialogTitle 
                                    id="customized-dialog-title" 
                                    onClose={this.handleClose}
                                >
                                    Products match
                                </BootstrapDialogTitle>
                                {/* list of temp results of products */}
                                <DialogContent dividers>
                                    {
                                        loading != true ?
                                            this.arrTop5Products(top5ProductsUI) :
                                                <p>...loading products</p>
                                    }
                                </DialogContent>
                                {/* actions */}
                                <DialogActions>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera/>
                                    </IconButton>
                                </DialogActions>
                            </BootstrapDialog>
                        </Grid>   
                    </Grid> 
                </div>
            </>
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    // top5Products 
    loading: state.top5Products1.loading,
    top5ProductsUI:state.top5Products1.top5ProductsUI
})

export default connect(mapStateToProps)(withStyles(styles)(ProductsResultsTempSearchingModeThree))

