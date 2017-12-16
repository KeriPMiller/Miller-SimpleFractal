import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      employees: [],
      companies: [],
      candidateId: '',
      companyId: '',
      targetEmployee: [],
      targetCompany: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    axios.get('/api/employee/')
    .then(res => res.data)
    .then(employees => {
      this.setState({employees})
    });

    axios.get('/api/company/2')
    .then(res => res.data)
    .then( company => {
      this.setState({targetCompany: company})
    });

    axios.get('/api/company/')
    .then(res => res.data)
    .then( companies => {
      this.setState({companies})
    });
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    console.log('submit');
  }

  render() {
    return (
      <div>
        <h1>Hello from the App Component</h1>
        { this.state.employees.length &&
          this.state.companies.length &&
          console.log(this.state)}
          <form onSubmit={this.handleSubmit}>
            <label>Candidate Id:</label>
            <input
              name='candidateId'
              type='text'
              value={this.state.candidateId}
              onChange={this.handleChange} ></input>
            <label>Company Id</label>
            <select
              name='companyId'
              value={this.state.companyId}
              onChange={this.handleChange}>
              {this.state.companies.map(company => (
                <option key={company.id} value={company.company_id}>{company.company_id}</option>
              ))}
            </select>
              <input type='submit' value='submit' />
          </form>
      </div>


    )
  }
}

export default App;
