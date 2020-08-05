import React from 'react'

class ImageCard extends React.Component { 
    state ={
        hover:false
    }
     handleImageHover = () => {
        this.setState({hover:!this.state.hover})
    }
     renderCard = () => {
       return  (<div> 
        <img src={this.props.image.primaryImage} width="200" height="300"></img>
        <div>{this.props.image.objectName} </div>
        {this.props.image.artistDisplayName? <div>{this.props.image.artistDisplayName}</div>:null}
        <div>{this.props.image.department} </div>
        <div>{this.props.image.dimensions} </div>
        <div>{this.props.image.medium} </div>
        <div>{this.props.image.objectDate} </div>
        
   
       </div>
       )
    }
    render(){
        return(
            <div onMouseEnter={this.handleImageHover} onMouseOut={this.handleImageHover}>
                {this.state.hover? this.renderCard(): <img src={this.props.image.primaryImage} width="200" height="300"></img>}
              
            </div>
        )
    }
 
}

export default ImageCard