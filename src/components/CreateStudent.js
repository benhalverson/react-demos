import React, { Component } from 'react';
import axios from 'axios';

class CreateStudent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMounted: false,
      isLoading: true
    };
    this.create = this.create.bind(this);
  }

  

  create(e) {
    e.preventDefault();
    const email = this.email.value;
    const url = `${this.props.host}/students`;


  axios.post('url', {email})
  .then(res => {
    const student = res.data
    this.props.created(student)
    this.setState({error: ''})
  })
  .catch(e => {
    this.setState({error: e.message});
  });
  }

  componentDidMount(){
    this.setState({
      isMounted: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false,
    })
  }

  render() {
    return (
      <div className="create-student">
        <h1>Create Student</h1>
        <div className="error">{this.state.error}</div>
        <form>
          <label>Email Address</label>
          <input ref={n => this.email = n} type="email" />
          <button onClick={this.create}>Create</button>
        </form>
      </div>
    );
  }
}

export default CreateStudent;