import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      candidateId: '',
      similarCanidates: [],
      targetEmployee: [],
      percentile: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.percentile = this.percentile.bind(this);
  }

  componentDidMount() {
    axios.get('/api/company/').then(res => res.data).then(companies => {
      this.setState({companies})
    });
  }

  handleChange(event) {
    console.log(this.state);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    // get target Candidate
    axios.get(`/api/employee/${event.target.candidateId.value}`).then(res => res.data).then(employee => {
      this.percentile(employee, 2);
      this.setState({targetEmployee: employee})
    })
  }

  getSimilarCanidates(canidateCompany) {
    let companies = this.state.companies
    // TODO: find company nead same fractal index and filterout the original employee co
  }

  percentile(employee, similarCompany) {
    // initialize with target employee stats
    let otherEmployeesScores = [employee.score]
    let totalScore = employee.score;
    // getemployees at other company to compare
    axios.get(`/api/employee/company/${similarCompany}`).then(res => res.data).then(otherEmployees => {
      this.setState({similarCanidates: otherEmployees})
    })
    // get an array of other employee scores and the total to find the percentile
    let sameLevel = this.state.similarCanidates.filter(canidate => canidate.title === employee.title)
    sameLevel.map(canidate => {
      totalScore += canidate.score;
    })
    // TODO: write percentile formula
    let percentile = Math.round(totalScore / sameLevel.length + 1)
    console.log(otherEmployeesScores.sort(), "total", percentile)
  }

  render() {
    return (<div>
      <h2>Percentile Lookup</h2>
      <form onSubmit={this.handleSubmit}>
        <label>Candidate Id:</label>
        <input name='candidateId' type='text' value={this.state.candidateId} onChange={this.handleChange}></input>
        <input type='submit' value='submit'/> {/* i would move this out to another hidden component <Message/> */}
        <div className="messageBox">
          <p>
            click submit twice (for now)</p>
          <h3>this candidate is in the {this.state.percentile}
            percentile for the role of {this.state.targetEmployee.title}
            compaired to similar companies</h3>
        </div>
      </form>
    </div>)
  }
}

export default App;
