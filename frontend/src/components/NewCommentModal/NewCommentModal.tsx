import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/postSlice";
import { TextField, Button, Box, Modal, Typography } from "@mui/material";
import { AppDispatch } from "../../redux/store";

interface NewCommentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (content: string) => void;
}

const NewCommentModal: React.FC<NewCommentModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [comment, setComment] = useState("");

  // const dispatch = useDispatch<AppDispatch>();

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(comment);
    setComment("");
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
          Add new comment
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSave}
        >
          <TextField
            label="Comment"
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Add comment
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewCommentModal;
