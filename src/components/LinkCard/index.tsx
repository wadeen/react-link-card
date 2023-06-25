import { AnchorHTMLAttributes } from "react";
import useFetchLinkData, { FetchLinkUrlType } from "../hooks/useFetchLinkData";
import styles from "./index.module.css";

type LinkCardProps = {
  /**  */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  /**  */
  titleTagName?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & FetchLinkUrlType;

export const LinkCard = ({ url, target = "_blank", titleTagName = "h2" }: LinkCardProps) => {
  const { loading, error, data: linkCardData } = useFetchLinkData(url);

  if (error) return <p>ERROR!</p>;
  if (loading) return <p>loading...</p>;

  const Tag = titleTagName;

  return (
    <a href={url} target={target} className={styles.baseContainer}>
      <div className={styles.baseTextArea}>
        <div className={styles.baseTitleArea}>{linkCardData?.title && <Tag className={styles.baseTitle}>{linkCardData?.title}</Tag>}</div>
        {linkCardData?.description && (
          <div className={styles.baseDescArea}>
            {linkCardData?.favicon && <img src={linkCardData?.favicon} alt="" width={24} height={24} />}
            <p className={styles.baseText}>{linkCardData?.description}</p>
          </div>
        )}
      </div>
      {linkCardData?.ogp && <img src={linkCardData?.ogp} alt="" className={styles.baseImg} />}
    </a>
  );
};

export const LinkCardLarge = ({ url, target = "_blank", titleTagName = "h2" }: LinkCardProps) => {
  const { loading, error, data: linkCardData } = useFetchLinkData(url);

  if (error) return <p>ERROR!</p>;
  if (loading) return <p>loading...</p>;

  const Tag = titleTagName;

  return (
    <a href={url} target={target} className={styles.container}>
      <div className={styles.textArea}>
        <Tag className={styles.title}>{linkCardData?.title}</Tag>
        <div className={styles.text}>
          <img src={linkCardData?.ogp} alt="" className={styles.imgStyle} width={24} height={24} />
          <p>{linkCardData?.description}</p>
        </div>
      </div>
      <img src={linkCardData?.favicon} alt="" />
    </a>
  );
};
