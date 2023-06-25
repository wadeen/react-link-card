import { AnchorHTMLAttributes } from "react";
import useFetchLinkData, { FetchLinkUrlType } from "../hooks/useFetchLinkData";

type LinkCardProps = {
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
} & FetchLinkUrlType;

export const LinkCard = ({ url, target = "_blank" }: LinkCardProps) => {
  const { loading, error, data: linkCardData } = useFetchLinkData(url);

  if (error) return <p>ERROR!</p>;
  if (loading) return <p>loading...</p>;

  return (
    <a href={url} target={target}>
      <h2>{linkCardData?.title}</h2>
      <img src={linkCardData?.ogp} alt="" />
      <img src={linkCardData?.favicon} alt="" />
      <p>{linkCardData?.description}</p>
    </a>
  );
};

export const LinkCardLarge = ({ url, target }: LinkCardProps) => {
  const { loading, error, data: linkCardData } = useFetchLinkData(url);

  if (error) return <p>ERROR!</p>;
  if (loading) return <p>loading...</p>;

  return (
    <a href={url} target={target}>
      <h2>{linkCardData?.title}</h2>
      <img src={linkCardData?.ogp} alt="" />
      <img src={linkCardData?.favicon} alt="" />
      <p>{linkCardData?.description}</p>
    </a>
  );
};
