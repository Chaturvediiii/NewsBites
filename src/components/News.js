import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMoreData = async () => {
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    
    // Check if parsedData.articles is defined
    if (parsedData.articles) {
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    }
  };

  const update = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(75);
    let parsedData = await data.json();
    
    console.log(parsedData);
    
    if (parsedData.articles) {
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
    }
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `NewsBites - ${props.category.toUpperCase()}`;
    update();
  }, []);

  return (
    <>
      <h1 className="text-center">
        NewsBites - TOP HEADLINES ON{" "}
        <span className="text-danger">
          {props.category.toUpperCase()}
        </span>{" "}
        CATEGORY
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles && articles.length > 0 && articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 30) : "No Title"}
                    description={element.description ? element.description.slice(0, 80) : "No Description"}
                    imageURL={element.urlToImage || "https://media.istockphoto.com/id/1313303632/video/breaking-news-template-intro-for-tv-broadcast-news-show-program-with-3d-breaking-news-text.jpg?s=640x640&k=20&c=S0dTZp37XKVcCAnoguMnRatvv4Nkp2cjmA5aYOOrJs8="}
                    newsURL={element.url}
                    author={element.author || "Unknown"}
                    publishedAt={element.publishedAt}
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

export default News;
