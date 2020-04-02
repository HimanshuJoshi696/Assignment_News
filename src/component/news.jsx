import React, { useState, useEffect } from "react";
import ShowNewsLanding from "./show-news-details";
const News = () => {
  const [pageId, setPageId] = useState(0);
  let getNewsFromLocal;
  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search?tags=front_page")
      .then(response => {
        if (response.status !== 200) {
          console.log("Status Code: " + response.status);
          return;
        }
        response.json().then(data => {
          getNewsFromLocal = JSON.parse(localStorage.getItem("newsResult"));
          if (getNewsFromLocal === null) {
            getDataUpdate(data);
          }
        });
      })
      .catch(err => {
        console.log("Error", err);
      });
  }, []);

  const getDataUpdate = result => {
    localStorage.setItem("newsResult", JSON.stringify(result));
    const getStorageData = JSON.parse(localStorage.getItem("newsResult"));
    setPageId(getStorageData.page);
  };
  const getNextNews = id => {
    fetch(`http://hn.algolia.com/api/v1/search?&page=${id}`)
      .then(response => {
        if (response.status !== 200) {
          console.log("Status Code: " + response.status);
          return;
        }
        response.json().then(data => {
          getDataUpdate(data);
        });
      })
      .catch(err => {
        console.log("Error", err);
      });
  };
  const newsState = JSON.parse(localStorage.getItem("newsResult"));
  return (
    <div className="song-list">
      {console.log("pageId", pageId)}
      {newsState &&
        newsState.hits &&
        Object.values(newsState.hits).map((item, index) => (
          <ShowNewsLanding data={item} key={item} index={index} />
        ))}
      <a
        onClick={() => {
          getNextNews(pageId + 1);
        }}
        className="more_button"
        href={`/api/v1/search?&page=${pageId + 1}`}
        data-testid="pagination-button"
      >
        More
      </a>
    </div>
  );
};
export default News;
