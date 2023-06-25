import styles from "./App.module.css";
import { LinkCard, LinkCardLarge } from "./components/LinkCard";
import useFetchLinkData, { FetchLinkUrlType } from "./components/hooks/useFetchLinkData";

function App() {
  return (
    <div className={styles.wrapper}>
      <h1>Demo page</h1>
      <div className={styles.container}>
        {/* サンプルの利用（標準・横並び） */}
        <LinkCard url={"https://zenn.dev/wadeen"} target="_blank" />

        {/* サンプルの利用（大・縦並び） */}
        <LinkCardLarge url={"https://zenn.dev/wadeen"} />

        {/* カスタムフックの利用 */}
        <CardItem url={"https://wadeen.net"} />
      </div>
    </div>
  );
}

export default App;

{
  /* カスタムフックの利用 */
}

const CardItem = ({ url }: FetchLinkUrlType) => {
  const { loading, error, data: linkCardData } = useFetchLinkData(url);

  if (error) return <p>ERROR!</p>;
  if (loading) return <p>loading...</p>;

  return (
    <a href={url} target="_blank">
      <h2>{linkCardData?.title}</h2>
      <img src={linkCardData?.ogp} alt="" />
      <img src={linkCardData?.favicon} alt="" />
      <p>{linkCardData?.description}</p>
    </a>
  );
};
