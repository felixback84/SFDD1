import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles"
// mui stuff
import GridContainer from "components/Grid/GridContainer.js"
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
// icons MUI
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'

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

class ProductsResultsSearchingModeThree extends Component {

    // state
    state = {
        expanded:{}
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
            console.log(`arrTop5Product: ${arrTop5Product}`)
            // arr push
            arr.push(
                <>
                    <GridItem sm={4} md={4} key={i} style={{padding:"10px"}}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {Math.round(arrTop5Product.meters * 10) / 10}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon/>
                                    </IconButton>
                                }
                                title={arrTop5Product.products.name}
                                // taxonomy
                                subheader={
                                    //this.taxoToListOfCategoriesAndTags(arrTop5Product.products.taxonomy)
                                    <Chip label={`$${arrTop5Product.products.price}`}/>
                                }
                            />
                            {/* product image */}
                            <CardMedia
                                component="img"
                                height="194"
                                image={arrTop5Product.products.imgUrl}
                                alt={arrTop5Product.products.name}
                            />
                            <CardContent>
                                {/* product description */}
                                <Typography variant="body2" color="text.secondary">
                                    {arrTop5Product.products.description}
                                </Typography>
                                {/* product price */}
                                <Chip label={arrTop5Product.products.price}/>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon/>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon/>
                                </IconButton>
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
                                        {
                                            arrTop5Product.products.tags.map((tag)=>(
                                                <Chip label={tag} variant="outlined"/>
                                            ))
                                        }
                                    </Stack>
                                    {/* description */}
                                    <Typography paragraph>
                                        {arrTop5Product.products.description}
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
        // redux state & style
        const {
            classes,
            // products
            loading,
            top5Products
        } = this.props

        return (
            <>
                <GridContainer>
                    {/* arr of products */}
                    {
                        loading != true ?
                            this.arrTop5Products(top5Products,classes) :
                                <p>...loading products</p>
                    }
                </GridContainer>
            </>
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    // top5Products
    loading: state.top5Products1.loading,
    top5Products:state.top5Products1.top5Products,
    top5ProductsListener:state.top5Products1.top5ProductsListener
});

export default connect(mapStateToProps)(withStyles(useStyles)(ProductsResultsSearchingModeThree))


