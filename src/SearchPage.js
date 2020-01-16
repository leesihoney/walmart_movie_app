import React, { Component } from 'react';
import Products from './components/Products';

class SearchPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			loaded: false,
			searchInput: ''
		}
	}

	_getData = async (query = this.state.searchInput) => {
		const data = await this._callApi(query);
    this.setState({
      data: data,
			loaded: true,
			searchInput: this.state.searchInput
    })
  }

	_callApi = query => {
    let url = `https://yts.lt/api/v2/list_movies.json`;
    if (query.length > 0) {
      url = `https://yts.lt/api/v2/list_movies.json?query_term=${query}`;
    }
    return fetch(url)
    .then(response => {
      const json = response.json()
      return json
    })
    .catch(err => this.setState({ placeholder: `Err msg: ${err}`}))
  }

  componentDidMount() {
		this._getData();
	}

	handleSubmit = event => {
		event.preventDefault();
		const inputQuery = document.querySelector('#walmart-search-input').value;
		return this._getData(inputQuery);
	}


	render() {
		return (
			<div className='container'>
				<div className='search-labels'>
					<h1 className="search-result-label">Showing Movies for {this.state.searchInput}</h1>
					<form className="nav-searchbar" onSubmit={this.handleSubmit}>
						<input type="search" placeholder="Enter Keywords..." id="walmart-search-input" name='Search' ref={(input) => this.query = input}/>
						<button className="search-button" id="submit-btn" type="submit">Search</button>
					</form>
				</div>
				{!this.state.loaded ? <p className='loading-message'>Loading...</p> : <Products entries={this.state.data.data.movies} /> }
			</div>
		)
	}
}

export default SearchPage;