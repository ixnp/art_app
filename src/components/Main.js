import React from 'react'
import ImageCard from './ImageCard'

const Main = (props) => {
   const displayDepartments = () => {
       return  props.departments.departments.map(item =>{
            return <option key={item.departmentId} value={item.displayName}>{item.displayName}</option>
        })
    }
    return(
        <div>
            <select onChange={props.handleChange}>
            {displayDepartments()}
            </select>
           {props.image !== false?<ImageCard image={props.image} next={props.next}/>:null}
        </div>
    )
}

export default Main