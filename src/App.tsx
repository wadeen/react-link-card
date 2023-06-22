import styles from "./App.module.css";
import LinkCard from "./components/LinkCard";

function App() {
  return (
    <div className={styles.wrapper}>
      <h1>Demo page</h1>
      <LinkCard />
    </div>
  );
}

export default App;
 