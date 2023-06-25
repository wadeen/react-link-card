import styles from "./App.module.css";
import LinkCard from "./components/LinkCard";
import useFetchLinkData from "./components/hooks/useFetchLinkData";

function App() {
  return (
    <div className={styles.wrapper}>
      <h1>Demo page</h1>
      <div className={styles.container}>
        <LinkCard
          url={"https://zenn.dev/wadeen"}
          render={({ title, description, ogp, favicon, url }) => (
            <a href={url} target="_blank">
              <h2>{title}</h2>
              <img src={ogp} alt="" />
              <img src={favicon} alt="" />
              <p>{description}</p>
            </a>
          )}
        />
        {/* error込み */}
        <LinkCard
          url={"https://wadeen"}
          render={({ title, description, ogp, favicon, url, error, loading }) => {
            if (loading) {
              return <p>loading...</p>;
            }
            if (error) {
              return <p>ERROR!</p>;
            }
            return (
              <a href={url} target="_blank">
                <h2>{title}</h2>
                <img src={ogp} alt="" />
                <img src={favicon} alt="" />
                <p>{description}</p>
              </a>
            );
          }}
        />

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

type CardItemProps = {
  url: `http${string}`;
};

const CardItem = ({ url }: CardItemProps) => {
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
