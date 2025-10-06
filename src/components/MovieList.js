import Movie from '../components/Movie';
import './MovieList.css';


function MovieList(props) {
    const {movies = []} = props;

    return (
        <div className='movies'>
            {
                movies.length ? movies.map(movie => {
                    return <Movie {...movie} key={movie.imdbID} />
                }) : <h3>Not Found</h3>
            }
        </div>
    )
}
export default MovieList;