import React from "react";
import moment from "moment";
const ShowNewsLanding = props => {
  const { title, url, author, created_at } = props.data;
  const urls = url;
  const getDomain =
    urls &&
    urls
      .replace("http://", "")
      .replace("https://", "")
      .split(/[/?#]/)[0];
  const domain = getDomain && getDomain.split("www.")[1];
  const now = moment(new Date());
  const hours = moment.duration(now.diff(created_at)).asHours();
  const roundedHours = Math.round(hours);
  const getIndex = props.index;
  const hideSection = (index) => {
    const getDataFromLocalStorage = JSON.parse(localStorage.getItem('newsResult'));
    let storeData;
    if (getDataFromLocalStorage === null) {
      storeData = []
    } else {
      storeData = getDataFromLocalStorage;
    }
    storeData.hits.splice(index, 1);
    localStorage.setItem("newsResult", JSON.stringify(storeData));
  };
  return (
    <div className="container">
      <ul className="news-list">
        <li id={getIndex}>
          <span className="list-index">{getIndex}</span>.{" "}
          <a href={url}>
            <span className="title">{title}</span>{" "}
          </a>
          <span className="domain_name">({domain}) by</span>{" "}
          <span className="author">{author}</span>{" "}
          <span className="hours">{roundedHours} hours ago</span>
          <a
            href="/"
            className="hide_link"
            onClick={e => {
              hideSection(getIndex, e);
            }}
          >
            {" "}
            [ hide ]{" "}
          </a>
        </li>
      </ul>
    </div>
  );
};
export default ShowNewsLanding;
