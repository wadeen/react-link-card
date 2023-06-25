import styles from "./App.module.css";
import { LinkCard, LinkCardLarge } from "./components/LinkCard";
// import useFetchLinkData, { FetchLinkUrlType } from "./components/hooks/useFetchLinkData";

function App() {
  return (
    <div className={styles.wrapper}>
      <h1 style={{ textAlign: "center" }}>Demo page</h1>
      <div className={styles.container}>
        {/* サンプルの利用（標準・横並び） */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <LinkCard url={"https://wadeen.net"} titleTagName="h3" />
          <LinkCard url={"https://zenn.dev/wadeen"} />
          <LinkCard url={"https://zenn.dev/chot/articles/ddd2844ad3ae61"} />
          <LinkCard url={"https://obake.land/blog/20230216"} target="_blank" />
        </div>

        {/* サンプルの利用（大・縦並び） */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <LinkCardLarge url={"https://wadeen.net"} titleTagName="h3" />
          <LinkCardLarge url={"https://zenn.dev/wadeen"} />
          <LinkCardLarge url={"https://zenn.dev/chot/articles/ddd2844ad3ae61"} />
          <LinkCardLarge url={"https://obake.land/blog/20230216"} target="_blank" />
        </div>
        {/* カスタムフックの利用 */}
        {/* <CardItem url={"https://wadeen.net"} /> */}
      </div>
    </div>
  );
}

export default App;

{
  /* カスタムフックの利用 */
}

// const CardItem = ({ url }: FetchLinkUrlType) => {
//   const { loading, error, data: linkCardData } = useFetchLinkData(url);

//   if (error) return <p>ERROR!</p>;
//   if (loading) return <p>loading...</p>;

//   return (
//     <a href={url} target="_blank">
//       <h2>{linkCardData?.title}</h2>
//       <img src={linkCardData?.ogp} alt="" />
//       <img src={linkCardData?.favicon} alt="" />
//       <p>{linkCardData?.description}</p>
//     </a>
//   );
// };
