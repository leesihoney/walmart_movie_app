import React from 'react';
import { Link } from 'react-router-dom';

const RecRow = (props) => {
	return (
		<div className='suggested-movie'>
			<Link to={{
				pathname: `/movies/${props.movie_id}`,
				movie_id: props.movie_id
			}}>
				<img className='suggested-movie__img'src={props.imageLink} alt={props.title + ' Poster'} />
			</Link>
			<Link to={{
				pathname: `/movies/${props.movie_id}`,
				movie_id: props.movie_id
			}}>
				<p className='suggested-movie__title'>{props.title}</p>
			</Link>
		</div>
	)
}

export default RecRow;