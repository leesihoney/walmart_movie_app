import React, { Component } from 'react';
import RecRow from './RecRow';

class MovieDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {},
			loaded: false,
			id: this._getId(),
			suggestions: []
		};
	}

	_getId = () => {
		if (this.props.location.movie_id) {
			return this.props.location.movie_id
		}

		const pathName = this.props.location.pathname.split('/');
		return pathName[pathName.length-1];
	}

  _getData = async (id = this.state.id) => {
		const data = await this._callDataApi(id);
		const suggestions = await this._callSuggestionsApi(id);
    this.setState({
      data: data,
			loaded: true,
			suggestions: suggestions.data.movies
    })
  }

  _callDataApi = id => {
    const URL = `https://yts.lt/api/v2/movie_details.json?movie_id=${id}`;
    return fetch(URL)
    .then(response => {
      const json = response.json()
      return json
    })
    .catch(err => this.setState({ placeholder: `Err msg: ${err}`}))
	}
	
	_callSuggestionsApi = id => {
    const URL = `https://yts.lt/api/v2/movie_suggestions.json?movie_id=${id}`;
    return fetch(URL)
    .then(response => {
      const json = response.json()
      return json
    })
    .catch(err => this.setState({ placeholder: `Err msg: ${err}`}))
	}
	

  componentDidMount() {
    this._getData();
	}
	
	render() {
		if (!this.state.loaded) {
			return ( <p className='loading-message'>loading...</p>)
		} else {
			const movie_image_link = this.state.data.data.movie.large_cover_image;
			const movie_name = this.state.data.data.movie.title;
			const movie_genres = this.state.data.data.movie.genres;
			const movie_likes = this.state.data.data.movie.like_count;
			const movie_year = this.state.data.data.movie.year;
			const movie_description = this.state.data.data.movie.description_full
			return (
				<div className='container'>
						<h1 className="search-labels">Detail</h1>
						<div className='movie-flexbox'>
							<img className='movie-detail-img' src={movie_image_link} alt={movie_name+' Poster'} />
							<div className='movie-details'>

								<h4 className='movie-title'>
									{movie_name} ({movie_year})  
								</h4>

								<div className='movie-genre-likes'>
									<p className='movie-genre'>
										Genres:&nbsp;
										{movie_genres.map((genre, id) => <span key={id} className='movie-genre-label'>{genre}&nbsp;</span>)}
									</p>
									<p className='movie-likes'>
									Likes:&nbsp;<span className='movie-likes-label'>{movie_likes}</span>
									</p>
								</div>

								<div className='movie-description'>
									<p className='movie-description-label'>Description</p>
									<p className='movie-description-contents'>{movie_description}</p>
								</div>
							</div>
						</div>
						<div className='movie-recommendations'>
							<p className='movie-description-label'>Recommendations for those viewed {movie_name} </p>
							<div className='movie-flexbox movie-rec-container'>
								{this.state.suggestions.map((suggestion, id) => {
									return (
											<RecRow key={id} movie_id={suggestion.id} title={suggestion.title} imageLink={suggestion.small_cover_image} />
									)	
								})}
							</div>

							
						</div>
				</div>
			)
		}
	}
}

export default MovieDetail;