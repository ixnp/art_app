import React from 'react';
import Main from './Main'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

class App extends React.Component {
  state={
    departments:{departments:[]},
    allObjectsInDepartment:[],
    currentObjectsInDepartment:[],
    departmentIDXStart:0,
    departmentIDXEnd: 5,
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
    if(this.state.currentObjectsInDepartment.length > 9) result = 'NEW_OBJ'
    switch(result){
      case 'NEW_OBJ': 
        console.log(this.state.currentObjectsInDepartment, prevState)
        if (this.state.currentObjectsInDepartment[0] !== prevState.currentObjectsInDepartment[0]) {
          this.state.currentObjectsInDepartment.forEach(item => this.fetchArt(item))
          this.setState({departmentIDXStart:this.state.departmentIDXStart+5, departmentIDXEnd:this.state.departmentIDXEnd+5})
        }
        default: 
        return this.state
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
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${department}`)
    .then(res => res.json())
    .then(data => {
      this.setState({allObjectsInDepartment:data.objectIDs, currentObjectsInDepartment: data.objectIDs.splice(this.state.departmentIDXStart,this.state.departmentIDXEnd),departmentIDXStart:this.state.departmentIDXStart+5,departmentIDXEnd:this.state.departmentIDXEnd+5  })
      return data 
    })
    .then(data => {
      console.log(this.state)
      this.state.currentObjectsInDepartment.forEach(item => this.fetchArt(item) )
    })
  }

  

  handleChange = (e) => {
    this.fetchDepartment(e.target.value)

  }
  handleNext = () =>{
    console.log(this.state)
    this.setState({currentObjectsInDepartment: this.state.allObjectsInDepartment.splice(this.state.departmentIDXStart,this.state.departmentIDXEnd)})
  }
  render(){
    return (
      <div className="App">
        <Main departments={this.state.departments} handleChange={this.handleChange} images={this.state.selectedImages} next={this.handleNext}/>
      </div>
    );
  }
}

export default App;
