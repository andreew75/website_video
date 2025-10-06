import '../components/Movie.css'

function Movie(props){
    const {Title, Year, imdbID, Type, Poster} = props;

    const handleImageError = (e) => {
        e.target.src = '/cover.png';
    }

    return (
        <div className="card">
            <img
                className="PosterImg"
                src={Poster !== 'N/A' ? Poster : '/cover.png'}
                alt={Title}
                onError={handleImageError}
            />
            <div className="card-body">
                <h3>{Title}</h3>
                <p>{Year}</p> <span id="year">{Type}</span>
            </div>
        </div>
    )
}

export default Movie;