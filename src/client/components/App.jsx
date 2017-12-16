import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      employees: [],
      companies: [],
      candidateId: '',
      similarCanidates: [],
      targetEmployee: [],
      percentile: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.percentile = this.percentile.bind(this);
  }

  componentDidMount(){
    axios.get('/api/employee/')
    .then(res => res.data)
    .then(employees => {
      this.setState({employees})
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
    // get target Candidate
    axios.get(`/api/employee/${event.target.candidateId.value}`)
    .then(res => res.data)
    .then( employee => {
      this.setState({targetEmployee: employee})
    })
    .catch(err => {console.log('not found!', err)});

    // get similar candidates
    console.log('submit',this.state.targetEmployee)
     this.percentile(this.state.targetEmployee);
  }

  getSimilarCanidates()
  percentile(employee){
    let totalScore;
   axios.get(`/api/employee/company/${employee.company_id}`)
    .then(res => res.data)
    .then( otherEmployees =>  {
        otherEmployees.map(singleEmployee => {
          totalScore += singleEmployee.score;
        })
      })

  }

  render() {
    return (
      <div>
        <h2>Percentile Lookup</h2>
          {console.log(this.state)}
          <form onSubmit={this.handleSubmit}>
            <label>Candidate Id:</label>
            <input
              name='candidateId'
              type='text'
              value={this.state.candidateId}
              onChange={this.handleChange} ></input>
              <input type='submit' value='submit' />
              <div className="messageBox">
                <h3>this candidate is in the {this.state.percentile}
                    percentile for the role of {this.state.targetEmployee.title} compaired to similar companies</h3>
              </div>
          </form>
      </div>


    )
  }
}

export default App;
