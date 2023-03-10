import React, { Component } from "react";
// import { movies } from "./getMovies";
import axios from "axios";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currPage: 1, // New State - To track the curr page of the front End
      movies: [], // To save the data of current page
      favourites: [],
    };
  }

  async componentDidMount() {
    //Side effects
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=d225a7da3295c18f0782d5c1605d51bc&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  }

  changeMovies = async () => {
    console.log("ChaneMovies Called");
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=d225a7da3295c18f0782d5c1605d51bc&language=en-US&page=${this.state.currPage}`
    );
    let data = res.data;
    this.setState({
      movies: [...data.results],
    });
  };

  handleRight = () => {
    let temparr = [];
    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      temparr.push(i);
    }
    // console.log(temparr);
    this.setState(
      {
        parr: [...temparr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    ); // Not calling the function but providing function definition
  };

  handleLeft = () => {
    if (this.state.currPage != 1) {
      this.setState(
        {
          currPage: this.state.currPage - 1,
        },
        this.changeMovies
      );
    }
  };

  handleClick = (value) => {
    if (value != this.state.currPage) {
      this.setState(
        {
          currPage: value,
        },
        this.changeMovies
      );
    }
  };

  handleFavourites = (movie) => {
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]"); //Local storage me jo bhi data save hota hai vo as an Array hota hai...
    if (this.state.favourites.includes(movie.id)) {
      oldData = oldData.filter((m) => m.id != movie.id);
    } else {
      oldData.push(movie);
    }
    localStorage.setItem('movies-app',JSON.stringify(oldData))
    console.log(oldData);
    this.handleFavouritesState();
  };

  handleFavouritesState=()=>{
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let temp = oldData.map((movie)=>movie.id);
    this.setState({
      favourites:[...temp]
    })
  }

  render() {
    // let movie = movies.results;
    const myStyle={
      backgroundImage: 
"url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
      height:'100vh',
      marginTop:'-70px',
      fontSize:'50px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
  };
    return (
      <>
        {this.state.movies.length == 0 ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h2 className="text-center">
              <strong style={{fontFamily:'Serif',}}>TRENDING</strong>
            </h2>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div
                  className="card movies-card"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    alt={movieObj.title}
                    className="card-img-top movies-img"
                  />
                  <h5 className="card-title movies-title">
                    {movieObj.original_title}
                  </h5>
                  <div
                    className="button-wrapper"
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {this.state.hover == movieObj.id && (
                      <a
                        className="btn btn-primary movies-button"
                        onClick={() => this.handleFavourites(movieObj)}
                      >{this.state.favourites.includes(movieObj.id)?"Remove from Favourites":"Add to Favourites"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center"}}>
              <nav aria-label="...">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" style={{cursor:"pointer",fontWeight:'bold',color:'black'}} onClick={this.handleLeft}>
                      Previous
                    </a>
                  </li>
                  {this.state.parr.map((value) => (
                    <li class="page-item" aria-current="page">
                      <a
                        class="page-link" style={{cursor:"pointer",fontWeight:'bold',color:'black'}}
                        onClick={() => this.handleClick(value)}
                      >
                        {value}
                      </a>
                    </li> // We cannot direct call the function in onClick so we have to send the function definition
                  ))}
                  <li class="page-item">
                    <a class="page-link" style={{cursor:"pointer",fontWeight:'bold',color:'black'}} onClick={this.handleRight}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
