import React from 'react';
import Main from './Main'
import Side from './Side'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

class App extends React.Component {
  state={
    departments:{departments:[]},
    currentDepartmentID:0,
    allObjectsInDepartment:[],
    currentObjectsInDepartment:[],
    departmentIDXStart:0,
    selectedDepartment:[],
    selectedImages:[],
    art_arr:[]
  }

  componentDidMount(){
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
    .then(res => res.json())
    .then(data => {
      this.setState({departments:data})
      return data
    })
    .then(data => this.fetchDepartment(data[0]))
    
  }

  componentDidUpdate(prePops,prevState) {
    let result = ''
    if(this.state.currentObjectsInDepartment.length > 9){
      if (this.state.currentObjectsInDepartment[0] !== prevState.currentObjectsInDepartment[0]) {
        this.state.currentObjectsInDepartment.forEach(item => this.fetchArt(item))
        this.setState({departmentIDXStart:this.state.departmentIDXStart+5, departmentIDXEnd:this.state.departmentIDXEnd+5})
      }
    } 
 

  }
  
  fetchArt = (art) => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${art}`)
    .then(res => res.json())
    .then(data => {
    this.setState({selectedImages:[...this.state.selectedImages, data] })
    })
  }

  fetchDepartment = (department) => {
    console.log(this.state)
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${department}`)
    .then(res => res.json())
    .then(data => {
      this.setState({selectedImages:[],allObjectsInDepartment:data.objectIDs, currentObjectsInDepartment: data.objectIDs.splice(this.state.departmentIDXStart, 5),departmentIDXStart:0, currentDepartmentID:department })
      return data 
    })
    .then(data => {
       this.state.currentObjectsInDepartment.forEach(item => this.fetchArt(item))
       console.log(this.state)
    })
    
  }

  handleChange = (e) => {
    this.fetchDepartment(e.target.value)

  }
  handleNext = () =>{
    console.log(this.state.allObjectsInDepartment.length)
    if(this.state.allObjectsInDepartment.length == 5){
      this.fetchDepartment(this.state.department)
    }else {
      this.setState({currentObjectsInDepartment: this.state.allObjectsInDepartment.splice(this.state.departmentIDXStart+5, 5), selectedImages:[]})
      this.state.currentObjectsInDepartment.forEach(item => this.fetchArt(item) )
    }

  }

  handleImageHover(){
    console.log('hover')
  }
  render(){
    
    return (
      <div className="app">
    
        <Main departments={this.state.departments} handleChange={this.handleChange} images={this.state.selectedImages} next={this.handleNext} handleImageHover={this.handleImageHover}/>
        <Side />
      </div>
    );
  }
}

export default App;
