import React from 'react';
import Main from './Main'

class App extends React.Component {
  state={
    departments:{departments:[]},
    allObjectsInDepartment:[],
    departmentIDX:0,
    selectedDepartment:[],
    selectedImage:false,
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
  
  fetchArt = (art, allObjectsInDepartment=this.state.allObjectsInDepartment) => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${art}`)
    .then(res => res.json())
    .then(data => {
    this.setState({selectedImage:data,departmentIDX:this.state.departmentIDX+1,allObjectsInDepartment:allObjectsInDepartment })
    })
  }

  fetchDepartment = (department) => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${department}`)
    .then(res => res.json())
    .then(data => this.fetchArt(data.objectIDs[this.state.departmentIDX], data.objectIDs))
  }

  handleChange = (e) => {
    this.fetchDepartment(e.target.value)

  }
  handleNext = () =>{
    let artID = this.state.departmentIDX
    this.fetchArt(this.state.allObjectsInDepartment[artID])
  }
  render(){
    return (
      <div className="App">
        <Main departments={this.state.departments} handleChange={this.handleChange} image={this.state.selectedImage} next={this.handleNext}/>
      </div>
    );
  }
}

export default App;
