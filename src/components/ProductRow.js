import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';


class ProductRow extends React.Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		year: PropTypes.number,
		imageLink: PropTypes.string,
		description: PropTypes.string.isRequired,
		rating: PropTypes.number,
		movie_id: PropTypes.number.isRequired
	}

	_truncate = (inputStr, inputNum) => inputStr.length > inputNum ? inputStr.slice(0, inputNum) + "..." : inputStr

	render() {
		return (
		<div className="product-result-row">
			<Link to={{
				pathname: `movies/${this.props.movie_id}`,
				movie_id: this.props.movie_id
			}}>
				<img className="product-result-image" alt={this.props.name + ' Poster'}src={this.props.imageLink}></img>
			</Link>
			<div className="product-result-description">
			<Link to={{
				pathname: `movies/${this.props.movie_id}`,
				movie_id: this.props.movie_id
			}} className="movie-link">	
				<h5 className="product-name">{this.props.name} ({this.props.year})</h5>
			</Link>
		<p className="product-description">{this._truncate(this.props.description, 150)}</p>
			</div>
		</div>
		)
	}
}

export default ProductRow;