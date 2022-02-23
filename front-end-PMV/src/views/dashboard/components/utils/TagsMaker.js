import React from 'react'
import Chip from '@material-ui/core/Chip';

// to make tags
const TagsMaker = (props) => {
	// print	
	console.log(`tags maker tags temp products: ${JSON.stringify(props.data)}`)
	let data = props.data
	let arrWithTags = [];
	let counter = 0
	if(Array.isArray(data)){
		let data = props.data
		arrWithTags.push(data.map((item)=>{
			return (
				<Chip label={<h5>{item}</h5>} key={counter++}/>
			)
		}))
	} else {
		let data = props.data
		for (let keyPair in data) {
			arrWithTags.push(data[keyPair].map((item)=>{
				return (
					<Chip label={<h5>{item}</h5>} key={counter++}/>
				)
			}))
		}
	}
	return arrWithTags
} 

export default TagsMaker