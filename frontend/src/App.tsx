import { useState } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import PostsList from "./pages/PostsList/PostsList";
import Container from "@mui/material/Container";
import NewPostModal from "./components/NewPostModal/NewPostModal";
// import { Route, Router, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PostDetails from "./pages/PostDetails/PostDetails";

function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Router>
      <div className={styles.App}>
        <Header onAddPostClick={handleOpenModal} />
        <NewPostModal open={openModal} onClose={handleCloseModal} />

        <Container>
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
