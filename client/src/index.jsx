import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.retrieve25MostForked = this.retrieve25MostForked.bind(this);

  }

  retrieve25MostForked() {
    axios.get('/repos')
      .then(({data}) => {
        this.setState({
          repos: data
        })
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.retrieve25MostForked();
  }

  search (term) {
    console.log(`${term} was searched`);
    axios.post('/repos', {user: term})
      .then(({data}) => {
        this.setState({
          repos:data
        })
      })
      .catch((err) => console.log('error adding repos, user likely does not'));
  }

  render () {
    return (<div>
      <div className="title">Who's Forked?</div>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));