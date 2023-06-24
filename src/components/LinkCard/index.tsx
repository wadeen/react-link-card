import { BASE_URL } from "../constants/base-url";
import styles from "./index.module.css";
import { AnchorHTMLAttributes, useEffect, useState } from "react";

type LinkCardProps = {
  /**  */
  url: `http${string}`;
  /**  */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
};

type FetchData = {
  /**  */
  title: string;
  /**  */
  description: string;
  /**  */
  ogp: string;
};

const LinkCard: React.FC<LinkCardProps> = ({ url, target }) => {
  const [fetchData, setFetchData] = useState<FetchData | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(encodeURI(BASE_URL + url));
        console.log("res: ", res);
        const data = await res.json();
        setFetchData(data);
      } catch (err) {
        console.error("err: ", err);
        setError(true);
      }
    })();
  }, [url]);

  if (!fetchData) {
    return (
      <div>
        <img src="/loading.gif" alt="Loading" width={50} height={50} />
      </div>
    );
  }

  return (
    <>
      {error ? (
        <div>
          <a href={url} className="link_card_error_url">
            {url}
          </a>
        </div>
      ) : (
        <a href={url} className={styles.container} target={target}>
          <div className={styles.textArea}>
            <p className={styles.title}>{fetchData.title}</p>
            <p className={styles.text}>{fetchData.description}</p>
          </div>
          <figure className={styles.figure}>
            <img className={styles.imgStyle} src={fetchData.ogp} alt={fetchData.title || ""} />
          </figure>
        </a>
      )}
    </>
  );
};

export default LinkCard;
