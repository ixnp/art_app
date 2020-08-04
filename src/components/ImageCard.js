import React from 'react'

const ImageCard = (props) => {
    return(
        <div>
            <img src={props.image.primaryImage} width="200" height="300"></img>
        </div>
    )
}

export default ImageCard