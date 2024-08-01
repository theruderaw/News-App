import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,ImageURL,newsURL} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
            <img src={ImageURL?ImageURL:"https://imgs.search.brave.com/QrrF8yctvnxGKn5UBvuEt1XL7Pv04zXmzQ0y50RN5cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyN19jYVJQUEg5/OUQ2RDFpRm9ua0NS/bUNHemtKUGYzNlFE/dy5qcGc"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title?title.slice(0,45):''}...</h5>
                <p className="card-text">{description?description.slice(0,45):''}...</p>
                <a href={newsURL} target = "_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
