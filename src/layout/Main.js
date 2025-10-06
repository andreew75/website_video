import React from 'react';
import './Main.css';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import Search from '../components/Search';

class Main extends React.Component {
    state = {
        movies: [],
        loading: true,
        totalResults: 0,
        currentPage: 1,
        currentSearch: 'cat',
        currentType: 'all'
    }

    componentDidMount() {
        this.searchMovies('cat', 'all', 1);
    }

    searchMovies = (str, type = 'all', page = 1) => {
        this.setState({
            loading: true,
            currentSearch: str,
            currentType: type,
            currentPage: page
        });

        fetch(`http://www.omdbapi.com/?apikey=ae546d65&s=${str}${type !== 'all' ? `&type=${type}` : ''}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === 'True') {
                    this.setState({
                        movies: data.Search,
                        loading: false,
                        totalResults: parseInt(data.totalResults)
                    });
                } else {
                    this.setState({
                        movies: [],
                        loading: false,
                        totalResults: 0
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({
                    movies: [],
                    loading: false,
                    totalResults: 0
                });
            });
    }

    render() {
        const { movies, loading, totalResults, currentPage, currentSearch, currentType } = this.state;


        const displayedMovies = movies ? movies.slice(0, 9) : [];

        return (
            <div className="main">
                <div className="wrap">
                    <Search
                        searchMovies={this.searchMovies}
                        totalResults={totalResults}
                        currentPage={currentPage}
                        currentSearch={currentSearch}
                        currentType={currentType}
                    />
                    {
                        loading ? <Loader /> : <MovieList movies={displayedMovies} />
                    }
                </div>
            </div>
        )
    }
}

export default Main;