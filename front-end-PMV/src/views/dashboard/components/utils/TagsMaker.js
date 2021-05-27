import React from 'react'
import Chip from '@material-ui/core/Chip';

// to make tags
const TagsMaker = (props) => {
	// print
	console.log(`tags maker: ${JSON.stringify(props.data)}`)
	let data = props.data
	let arrWithTags = [];
	let counter = 0
	for (let keyPair in data) {
		arrWithTags.push(data[keyPair].map((item)=>{
			return (
				<Chip label={<h5>{item}</h5>} key={counter++}/>
			)
		}))
	}
	return arrWithTags
} 

export default TagsMaker