import React from 'react'

const ImageCard = (props) => {
    return(
        <div>
            <img src={props.image.primaryImage} width="500" height="600"></img>
            <button onClick={props.next}>Next</button>
        </div>
    )
}

export default ImageCard