import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Posts from "./components/PostsList/PostsList";
import Container from "@mui/material/Container";

function App() {
  return (
    <div className={styles.App}>
      <Header />

      <Container>
        <Posts />
      </Container>
    </div>
  );
}

export default App;
