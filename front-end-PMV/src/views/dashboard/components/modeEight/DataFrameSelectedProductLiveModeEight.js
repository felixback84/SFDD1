import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles"
// mui stuff
import GridItem from "components/Grid/GridItem.js"
import { styled } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Box from "@material-ui/core/Box"
import LinearProgress from "@material-ui/core/LinearProgress"
// icons MUI
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
// components
import ColorMtsAvatar from "../utils/ColorMtsAvatar"
// Redux stuff
import { connect } from 'react-redux'
// css
import shoppingCartStyle from "../../../../assets/theme/material-kit-pro-react/shoppingCartStyle.js"
const useStyles = shoppingCartStyle

// expand component
const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

class DataFrameSelectedProductLiveModeEight extends Component {

    // state
    constructor(props) {
        super(props)
        this.state = {
            expanded:{},
            arrCellsLive: []
        } 
    }

    // to map changes
    componentWillReceiveProps(nextProps){
        if(nextProps.top5ProductListener){
            // set state
            // this.setState({ arrCellsLive: this.props.top5TagListener })
            // var to arr
            let arrFinalLive = []

            // top5Tag live promise
            const myPromiseLive = new Promise((resolve, reject)=>{
                console.log(`state comparasion: ${this.props.top5ProductListener.length === this.props.lengthProductsSelected}`)
                if(this.props.top5ProductListener.length === this.props.lengthProductsSelected){
                    this.props.top5ProductListener.map((top5Tag)=>{
                        arrFinalLive.push({...top5Tag})
                    })
                    // print
                    console.log(`arrFinalLive: ${JSON.stringify(arrFinalLive)}`)
                    // promise resolve
                    resolve(arrFinalLive)
                }
            })  
            
            // live list of data for table
            myPromiseLive
                .then((data)=>{
                    this.setState({ arrCellsLive: data })
                })  
                .catch((err) => console.log('There was an error:' + err))
        }
    }

    // event to expand
    handleExpandClick = (e,key) => {
        let exp = false
        this.setState( 
            // expanded:true
            // !expanded
            {expanded:{
                // [event.target.name]: !exp
                [key]:!exp
            }}
        )
        // print
        console.log(`expand products state: ${JSON.stringify(this.state)}`)
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
    arrTop5Products(arrTop5Products,classes){
        // var to hold the list of nodes
        let arr = []
        // loop
        arrTop5Products.map((arrTop5Product,i)=>{
            // print
            console.log(`arrTop5ProductLive: ${arrTop5Product}`)
            // arr push
            arr.push(
                <>
                    <GridItem xs={4} >
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                avatar={
                                    // companyName
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        <ColorMtsAvatar
                                            meters={arrTop5Product.meters} 
                                            companyname={arrTop5Product.companyData.companyName}
                                        />
                                    </Avatar> 
                                }  
                                action={
                                    <IconButton aria-label="settings"> 
                                        <MoreVertIcon/>
                                    </IconButton>
                                }
                                title={arrTop5Product.product.name}
                                // price
                                subheader={
                                    <Chip label={`$${arrTop5Product.product.price}`}/>
                                }
                            />
                            {/* product image */}
                            <CardMedia
                                component="img"
                                height="194"
                                image={arrTop5Product.product.imgUrl}
                                alt={arrTop5Product.product.name}
                            /> 
                            <CardContent>
                                {/* meters bar*/}
                                <Box display="flex" alignItems="center">
                                    <Box component="span" marginRight=".5rem">
                                        {arrTop5Product.meters.toFixed(2)} Meters
                                    </Box>
                                    <Box width="100%">
                                        <LinearProgress
                                            variant="determinate"
                                            value={arrTop5Product.meters}
                                            classes={{
                                                root: classes.linearProgressRoot,
                                                bar: classes.bgGradientError,
                                            }}
                                        />
                                    </Box>
                                </Box>
                                {/* tags */}
                                {
                                    arrTop5Product.product.tags.map((tag)=>(
                                        <Chip label={tag} variant="outlined"/>
                                    ))
                                }
                                {/* product description */}
                                <Typography variant="body2" color="text.secondary">
                                    {arrTop5Product.product.description}
                                </Typography>
                            </CardContent>
                            {/* actions */}
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon/>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon/>
                                </IconButton>
                                
                                {/* expand */}
                                <ExpandMore
                                    name={i}
                                    expand={this.state.expanded[i]}
                                    onClick={(e)=>(this.handleExpandClick(e,i))}
                                    aria-expanded={this.state.expanded[i]}
                                    aria-label="show more"
                                >
                                <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            {/* collapser */}
                            <Collapse 
                                in={this.state.expanded[i]} 
                                timeout="auto" 
                                unmountOnExit
                            >
                                {/* content of collapser */}
                                <CardContent>
                                    {/* tags */}
                                    <Stack direction="row" spacing={1}>
                                        <Typography paragraph>
                                            Tags in this product:
                                        </Typography>
                                        {this.taxoToListOfCategoriesAndTags(arrTop5Product.product.taxonomy)}
                                    </Stack>
                                    {/* description */}
                                    <Typography paragraph>
                                        {arrTop5Product.product.description}
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </GridItem>
                </>
            )
        })
        return arr
    }

    render() { 
        return(
            <>
                {this.arrTop5Products(
                    this.state.arrCellsLive,
                    this.props.classes
                )}
            </> 
        )
    }
}
 
// connect to global state in redux
const mapStateToProps = (state) => ({
    // top5Products 
    loading: state.top5Products1.loading, 
    top5Products:state.top5Products1.top5Products,
    top5ProductListener:state.top5Products1.top5ProductListener,
    // top5ProductsUI:state.top5Products1.top5ProductsUI
});

export default connect(mapStateToProps)(withStyles(useStyles)(DataFrameSelectedProductLiveModeEight))


