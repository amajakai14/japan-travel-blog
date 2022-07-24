import Axios, { AxiosRequestConfig } from "axios";
import { title } from "process";
import { useEffect, useState } from "react";
import StarsRating from "react-star-rate";
import { number } from "zod";
import Reddit_logo from "../../static/Reddit_logo.svg";

interface jikan {
  title: string;
  title_japanese: string;
  score: number;
  images: { jpg: { image_url: string } };
  url: string;
  popularity: number;
}

const Anime = () => {
  const url = "https://api.jikan.moe/v4/seasons/now";
  const option = {
    headers: {},
  };
  const [animeList, setAnimeList] = useState<Array<jikan>>([]);
  const [language, setLanguage] = useState<boolean>(false);
  const [sd, setSd] = useState(0);
  const handleGetAnime = async () => {
    const res = await Axios.get(url);
    console.log(res.data);

    const lastPage = !res.data.pagination.has_next_page;
    let animeArray = [];
    animeArray = res.data.data;
    let cbArray = [];
    if (!lastPage) cbArray = await getMoreAnimeList(res, 2, 1);
    setAnimeList([...animeArray, ...cbArray]);
  };

  async function getMoreAnimeList(
    data: any,
    page: number,
    count: number,
    resultArray: any = []
  ): Promise<Array<any>> {
    const res = await Axios.get(url, { params: { page } });
    const lastPage = !res.data.pagination.has_next_page;
    console.log(res.data);
    console.log("lastpage", lastPage);
    count++;
    const returnArray = [...resultArray, ...res.data.data];
    let cbArray = [];
    while (!lastPage && count < 3) {
      cbArray = await getMoreAnimeList(res, page + 1, count, returnArray);
    }
    return [...returnArray, ...cbArray];
  }

  useEffect(() => {
    console.log(animeList);
    if (typeof window !== "undefined") {
      window.navigator.language === "ja"
        ? setLanguage(false)
        : setLanguage(true);
    }
  }, [animeList]);

  const redditSearchEndpoint = "https://www.reddit.com/search/?q=";

  function generateSearchParam(word: string) {
    return redditSearchEndpoint + word.split(" ").join("%20");
  }

  return (
    <>
      <div>Anime this Season</div>
      <button onClick={handleGetAnime}>Click this</button>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {animeList.length > 0 &&
          animeList.map((item: jikan, index: number) => {
            let score: number;
            if (!item.score) score = 0;
            score = (Math.round(item.score) * 10) / 20;

            const redditurl = generateSearchParam(item.title);

            return (
              <>
                <div className="text-center">
                  {language ? (
                    <div key={`title_${index}`}>{item.title}</div>
                  ) : (
                    <div key={`title_${index}`}>{item.title_japanese}</div>
                  )}

                  <img
                    src={item.images.jpg.image_url}
                    key={`img_${index}`}
                    width="100"
                    height="100"
                    alt=""
                    className="mx-auto"
                  />
                  <StarsRating
                    value={score}
                    key={`score_${index}`}
                    disabled={true}
                    style={{
                      style: { fontSize: "1em" },
                      full: { star: { cursor: "default" } },
                      half: { star: { cursor: "default" } },
                      zero: { star: { cursor: "default" } },
                    }}
                  />
                  <a
                    href={item.url}
                    key={`animelist_${index}`}
                    target="_blank"
                    className="mx-auto "
                  >
                    <img
                      alt="MyAnimeList Logo.png"
                      src="../../static/MyAnimeList_Logo.png"
                      width="100"
                      height="30"
                      data-image-name="MyAnimeList Logo.png"
                      data-image-key="MyAnimeList_Logo.png"
                      className="mx-auto p-2"
                    ></img>
                  </a>
                  <a href={redditurl} target="_blank" className="mx-auto">
                    <img
                      src="../../static/Reddit_logo.svg"
                      alt="reddit-logo"
                      width="100"
                      height="30"
                      className="mx-auto p-2"
                    />
                  </a>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Anime;
