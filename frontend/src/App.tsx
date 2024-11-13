import { useState } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Posts from "./components/PostsList/PostsList";
import Container from "@mui/material/Container";
import NewPostModal from "./components/NewPostModal/NewPostModal";

function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className={styles.App}>
      <Header onAddPostClick={handleOpenModal} />
      <NewPostModal open={openModal} onClose={handleCloseModal} />

      <Container>
        <Posts />
      </Container>
    </div>
  );
}

export default App;
