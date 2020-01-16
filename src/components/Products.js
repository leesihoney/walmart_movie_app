import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductRow from './ProductRow';

class Products extends Component {
	static propTypes = {
		entries: PropTypes.array.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			results: this.props.entries.map(entry => {
				return {
					movie_id: entry.id,
					name: entry.title,
					year: entry.year,
					rating: entry.rating,
					description: entry.description_full,
					imageLink: entry.small_cover_image
				}
			})
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
    let newNextProps = nextProps.entries.map(entry => {
      return {
				movie_id: entry.id,
        name: entry.title,
				year: entry.year,
				rating: entry.rating,
				description: entry.description_full,
				imageLink: entry.large_cover_image
      }
    })
    if (prevState.results !== newNextProps) {
      return {
        results: newNextProps
      }
    }
    return null;
  }

	render() {
		return (
			<div className='products-container'>
				{this.state.results.map((result, id) => {
					return (
							<ProductRow key={id} movie_id={result.movie_id} name={result.name} year={result.year} description={result.description} rating={result.rating} imageLink={result.imageLink} />
					)
				})}
			</div>
		)
	}
}

export default Products;