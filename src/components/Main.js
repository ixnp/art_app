import React from 'react'
import ImageCard from './ImageCard'

const Main = (props) => {
   const displayDepartments = () => {
       return  props.departments.departments.map(item =>{
            return <option key={item.departmentId} value={item.displayName}>{item.displayName}</option>
        })
    }
    const displayImageCards = (images) =>{
        return images.map(item => <ImageCard image={item} handleImageHover={props.handleImageHover}/>)
    }

    return(
        <div>
            <select onChange={props.handleChange}>
            {displayDepartments()}
            </select>
           {props.image !== []?displayImageCards(props.images):null}
           <button onClick={props.next}>Next</button>

        </div>
    )
}

export default Main