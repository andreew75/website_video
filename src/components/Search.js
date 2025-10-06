import React from 'react';
import './Search.css';

class Search extends React.Component {
    state = {
        search: this.props.currentSearch || '',
        type: this.props.currentType || 'all'
    }

    componentDidMount() {

        this.setState({
            search: this.props.currentSearch || '',
            type: this.props.currentType || 'all'
        });
    }

    handleSearch = (page = 1) => {
        const { search, type } = this.state;
        const { searchMovies } = this.props;

        if (search.trim()) {
            searchMovies(search, type, page);
        }
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    }

    handelFilter = (event) => {
        this.setState(
            { type: event.target.dataset.type },
            () => { this.handleSearch(1); }
        );
    }

    nextPage = () => {
        const { currentPage, totalResults } = this.props;
        const totalPages = Math.ceil(totalResults / 10);

        if (currentPage < totalPages) {
            this.handleSearch(currentPage + 1);
        }
    }

    prevPage = () => {
        const { currentPage } = this.props;

        if (currentPage > 1) {
            this.handleSearch(currentPage - 1);
        }
    }

    goToPage = (page) => {
        this.handleSearch(page);
    }

    generatePageNumbers = () => {
        const { totalResults, currentPage } = this.props;
        const totalPages = Math.ceil(totalResults / 10);

        if (totalPages <= 0) return [];

        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages = [];
        pages.push(1);

        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if (startPage > 2) {
            pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            pages.push('...');
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentSearch !== this.props.currentSearch) {
            this.setState({ search: this.props.currentSearch });
        }
        if (prevProps.currentType !== this.props.currentType) {
            this.setState({ type: this.props.currentType });
        }
    }

    render() {
        const { totalResults, currentPage } = this.props;
        const totalPages = Math.ceil(totalResults / 10);
        const pageNumbers = this.generatePageNumbers();

        const shouldShowPagination = totalResults > 0 && pageNumbers.length > 0;

        return (
            <>
                <div className="search">
                    <input
                        type="search"
                        placeholder="Search"
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onKeyPress={this.handleKeyPress}
                    />
                    <div className="search-button">
                        <button className="search-button" onClick={() => this.handleSearch(1)}>Search</button>
                    </div>
                </div>
                <div className="radio">
                    <input type="radio" data-type="all" checked={this.state.type === "all"} onChange={this.handelFilter} name="type" id="all"/> <label htmlFor='all'>All</label>
                    <input type="radio" data-type="movie" checked={this.state.type === "movie"} onChange={this.handelFilter} name="type" id="movie"/> <label htmlFor="movie">Movie</label>
                    <input type="radio" data-type="series" checked={this.state.type === "series"} onChange={this.handelFilter} name="type" id="series"/> <label htmlFor="series">Series</label>
                    <input type="radio" data-type="game" checked={this.state.type === "game"} onChange={this.handelFilter} name="type" id="games"/> <label htmlFor="games">Games</label>
                </div>

                {shouldShowPagination && (
                    <div className="navigation">
                        <button
                            className="btn btn-prev"
                            onClick={this.prevPage}
                            disabled={currentPage <= 1}
                        >
                            {"<<"}
                        </button>

                        <div className="page-numbers">
                            {pageNumbers.map((page, index) => (
                                page === '...' ? (
                                    <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
                                ) : (
                                    <button
                                        key={page}
                                        className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                        onClick={() => this.goToPage(page)}
                                    >
                                        {page}
                                    </button>
                                )
                            ))}
                        </div>

                        <button
                            className="btn btn-next"
                            onClick={this.nextPage}
                            disabled={currentPage >= totalPages}
                        >
                            >>
                        </button>

                        <span className="page-info">
                            Page {currentPage} of {totalPages} ({totalResults} found)
                        </span>
                    </div>
                )}
            </>
        )
    }
}

export default Search;