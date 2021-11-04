import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles"
// nodejs library that concatenates classes
// import classNames from "classnames";
// mui stuff
import GridContainer from "components/Grid/GridContainer.js"
import GridItem from "components/Grid/GridItem.js"
// import Button from "../../../../components/CustomButtons/Button.js"
// import Card from "components/Card/Card.js"
// import CardHeader from "components/Card/CardHeader.js"
// import CardBody from "components/Card/CardBody.js"
// import CardFooter from "components/Card/CardFooter"
// import Tooltip from "@material-ui/core/Tooltip"
// mui icons
// import Favorite from "@material-ui/icons/Favorite"

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
                                    <MoreVertIcon />
                                </IconButton>
                                }
                                title={arrTop5Product.products.name}
                                subheader={`${arrTop5Product.products.category}: ${arrTop5Product.products.tags}`}
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image={arrTop5Product.products.imgUrl}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    This impressive paella is a perfect party dish and a fun meal to cook
                                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                                    if you like.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
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
                                <CardContent>
                                    <Typography paragraph>Method:</Typography>
                                    <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                        aside for 10 minutes.
                                    </Typography>
                                    <Typography paragraph>
                                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                        stirring often until thickened and fragrant, about 10 minutes. Add
                                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                    </Typography>
                                    <Typography paragraph>
                                        Add rice and stir very gently to distribute. Top with artichokes and
                                        peppers, and cook without stirring, until most of the liquid is absorbed,
                                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                        mussels, tucking them down into the rice, and cook again without
                                        stirring, until mussels have opened and rice is just tender, 5 to 7
                                        minutes more. (Discard any mussels that don’t open.)
                                    </Typography>
                                    <Typography>
                                        Set aside off of the heat to let rest for 10 minutes, and then serve.
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
    top5Products:state.top5Products1.top5Products
});

export default connect(mapStateToProps)(withStyles(useStyles)(ProductsResultsSearchingModeThree))


