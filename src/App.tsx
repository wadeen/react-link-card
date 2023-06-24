import styles from "./App.module.css";
import LinkCard from "./components/LinkCard";

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
      </div>
    </div>
  );
}

export default App;
