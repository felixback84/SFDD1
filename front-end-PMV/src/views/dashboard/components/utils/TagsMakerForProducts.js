import React from 'react'
import Chip from '@material-ui/core/Chip'
// Redux stuff
import {connect} from 'react-redux'

// to make tags
const TagsMakerForProducts = (props) => {
    // list of products
    let data = props.data
	// print	
	// console.log(`tags maker for products: ${JSON.stringify(data)}`)
    // arr
    let arrWithTags = []
    // index
	let counter = 0
    // extract tags from all product categories
    data.map((item)=>{
        // obj
        let taxoProduct = item.product.taxonomy
        // print	
	    // console.log({taxoProduct})
        // loop in key obj
        for (let keyPair in taxoProduct) {
            arrWithTags.push(taxoProduct[keyPair])
        }  
    })
    // create unique list of badges
    let uniqueTags = [...new Set(arrWithTags)];
    return uniqueTags.map((item)=>{
        return (
            <Chip label={<h5>{item}</h5>} key={counter++}/>
        )
    })
} 

// connect to global state in redux
const mapStateToProps = (state) => ({
    // top5Products 
    loading: state.top5Products1.loading,
    top5Products:state.top5Products1.top5Products,
})

export default connect(mapStateToProps)(TagsMakerForProducts)