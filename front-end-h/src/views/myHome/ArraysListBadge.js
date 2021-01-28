import React from 'react'
import Badge from "components/Badge/Badge.js";

const ArraysListBadge = (props) => {
    let profileToMatch = props.profiletomatch
    let arrWithTags = [];
    let keyPair = undefined
    for (keyPair in profileToMatch) {
    arrWithTags.push(  
            <h4>{keyPair}:</h4>,        
            profileToMatch[keyPair].map(item=><Badge>{item}</Badge>)
        )
    }  
    return(
        <div>
            <ul>{arrWithTags}</ul>
        </div>
    )
}

export default ArraysListBadge;