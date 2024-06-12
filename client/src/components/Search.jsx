import axios from "axios";
import { useState, useEffect } from "react";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [travelData, setTravelData] = useState([]);
  const [copied, setCopied] = useState();

  const getTravelData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/trips?keywords=" + searchText
      );
      setTravelData(response.data.data);
      setCopied(response.data.data.map((a) => false));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTravelData();
  }, [searchText]);
  return (
    <>
      <section className="search-travel-box">
        <label htmlFor="search-travel" />
        <span>ค้นหาที่เที่ยว</span>
        <br />
        <input
          type="text"
          name="search-travel"
          id="search-travel"
          placeholder="ค้นหาแล้วไปกัน ..."
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </section>
      <section className="travel-result-section">
        <div className="travel-result-list">
          {travelData.map((data, index) => {
            return (
              <div className="travel-result-box" key={data.eid}>
                <figure className="travel-result-image">
                  <img
                    src={data.photos[0]}
                    alt="some travel image"
                    width="350"
                    height="215"
                  />
                </figure>
                <figcaption className="travel-result-detail">
                  <h2>
                    <a href={data.url} target="_blank">
                      {data.title}
                    </a>
                  </h2>
                  <p>{data.description.slice(0, 100)}...</p>
                  <span>
                    <a className="read-more" target="_blank" href={data.url}>
                      อ่านต่อ
                    </a>
                  </span>
                  <span className="travel-tags-list">
                    หมวด{" "}
                    {data.tags.map((tag, tagIndex) => {
                      return data.tags.length - 1 !== tagIndex ? (
                        <a
                          key={tagIndex}
                          onClick={() => {
                            searchText.includes(tag)
                              ? null
                              : setSearchText(searchText + tag + " ");
                          }}
                          className="travel-tags"
                        >
                          {tag}
                        </a>
                      ) : (
                        <span key={tagIndex}>
                          และ{" "}
                          <a
                            onClick={() => {
                              searchText.includes(tag)
                                ? null
                                : setSearchText(searchText + tag + " ");
                            }}
                            className="travel-tags"
                          >
                            {tag}
                          </a>
                        </span>
                      );
                    })}
                  </span>
                  <div className="travel-image-list">
                    <figure>
                      {data.photos.map((image, imageIndex) => {
                        if (imageIndex > 0) {
                          return (
                            <img
                              key={imageIndex}
                              className="travel-image-more"
                              src={image}
                              alt=""
                              width="75"
                              height="75"
                            />
                          );
                        }
                      })}
                    </figure>
                    <a
                      className="btn-clipboard"
                      onClick={() => {
                        navigator.clipboard.writeText(data.url);
                        setCopied(copied.toSpliced(index, 1, true));
                        setTimeout(() => {
                          setCopied(copied.toSpliced(index, 1, false));
                        }, 2000);
                      }}
                    >
                      {copied[index] ? "Copied!" : "Copy to Clipboard"}
                    </a>
                  </div>
                </figcaption>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Search;
