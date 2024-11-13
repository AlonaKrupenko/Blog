// src/components/CreatePostModal/CreatePostModal.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/postSlice";
import { TextField, Button, Box, Modal, Typography } from "@mui/material";
import { AppDispatch } from "../../redux/store";

interface NewPostModalProps {
  open: boolean;
  onClose: () => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      await dispatch(createPost({ title, content }));
      setTitle("");
      setContent("");
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Create a New Post
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Content"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={4}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create Post
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewPostModal;
