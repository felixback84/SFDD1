import React from 'react'
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Chip from '@material-ui/core/Chip';

const ArraysListBadge = (props) => {
	
	let profileToMatch = props.profiletomatch
	let arrWithTags = [];
	for (let keyPair in profileToMatch) {
		arrWithTags.push(profileToMatch[keyPair].map((item)=><Chip label={item}/>))
	}  
	//console.log(arrWithTags)
	return(
		<GridContainer>
			<GridItem xs={12} sm={12} md={12}>
				{arrWithTags}
			</GridItem>
		</GridContainer>
	)
}

export default ArraysListBadge
