import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    articles = []
    constructor(){
        super();
        console.log("Hello, constructor in News")
        this.state = {
            articles: this.articles,
            loading: false,
            page:1
        }
      }
    
    handleNextClick = async () => {
        if(!Math.ceil(this.state.totalResults/this.props.pageSize) < this.state.page+1){
            this.setState({loading:true})
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3689187d3495486c9bff8a48b99772fd&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
            let data = await fetch(url);
            let parsedData = await data.json();
            // console.log(parsedData);
            this.setState({articles:parsedData.articles})
            this.setState({
                page:this.state.page+1,
                loading:false
            })
            
        }
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3689187d3495486c9bff8a48b99772fd&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        this.setState({loading:true})
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({articles:parsedData.articles})
        this.setState({
            page:this.state.page-1,
            loading:false
        })
        
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=3689187d3495486c9bff8a48b99772fd&page=1&pageSize=${this.props.pageSize}`
        
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles,loading:false})
        this.setState({totalResults:parsedData.totalResults})
    }
  render() { 
    return (
      <div className = "container my-3">
        <h1 className="text-center">Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
            return (<div className='col-md-4' key={element.url}>
                <NewsItem title={element.title} description={element.description} ImageURL = {element.urlToImage} newsURL = {element.url}/>
            </div>)
        })}
        </div>
        <div className="container my-3 d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
            <button disabled={Math.ceil(this.state.totalResults/this.props.pageSize) < this.state.page+1} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
      </div>
    
    )
  }
}

export default News
