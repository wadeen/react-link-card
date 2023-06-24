import styles from "./App.module.css";
import LinkCard from "./components/LinkCard";

function App() {
  return (
    <div className={styles.wrapper}>
      <h1>Demo page</h1>
      <div className={styles.container}>
        <LinkCard  url={`https://www.wadeen.net`}  />
      </div>
    </div>
  );
}

export default App;
