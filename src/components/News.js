import React,{useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

 const News =(props) =>  {

  const [articles,setArticles] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)


  const fetchMoreData = async() => {
    setPage(page+1)
      let url = `https://newsdata.io/api/1/latest?country=${props.country}&category=${props.category}&apiKey=${process.env.NEWS_API_KEY}&page=${page}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.results))
      setTotalResults(parsedData.totalResults)
  };

  const update = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c99990da508d4394a0b79e8e8ca94885&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(75)
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  };

  useEffect(()=>{
    document.title = `NewsMonkey - ${props.category.toUpperCase()}`;
    update();
  },[])


    return (
      <>
        <h1 className="text-center">
          NewsMonkey - TOP HEADLINES ON{" "}
          <span className="text-danger">
            {props.category.toUpperCase()}
          </span>{" "}
          CATEGORY
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.article_id}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 30) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imageURL={element.image_url}
                    newsURL={element.source_url}
                    author={element.creator ? element.author.slice(0, 10) : ""}
                    publishedAt={
                      element.pubDate
                        ? element.publishedAt.slice(0, 10)
                        : ""
                    }
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}

export default News
