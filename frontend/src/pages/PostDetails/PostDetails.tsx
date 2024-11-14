import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deletePost, fetchPostById } from "../../redux/postSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NewCommentModal from "../../components/NewCommentModal/NewCommentModal";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPost, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchPostById(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (id) {
      dispatch(deletePost(id)).then(() => {
        navigate("/");
      });
    }
  };

  const handleOpenCommentModal = () => setIsCommentModalOpen(true);
  const handleCloseCommentModal = () => setIsCommentModalOpen(false);

  const handleSaveComment = (content: string) => {
    if (id) {
      dispatch(addComment({ postId: id, content }));
      setIsCommentModalOpen(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Button variant="contained" color="warning">
        Edit Post
      </Button>
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete Post
      </Button>

      <Typography variant="h4">{currentPost?.title}</Typography>
      <Typography variant="body1">{currentPost?.content}</Typography>

      <Typography variant="h6">Comments</Typography>
      <Button
        onClick={handleOpenCommentModal}
        variant="contained"
        color="success"
      >
        Add comment
      </Button>

      <NewCommentModal
        open={isCommentModalOpen}
        onClose={handleCloseCommentModal}
        onSave={handleSaveComment}
      />

      {currentPost?.comments.length ? (
        currentPost.comments.map((comment) => (
          <div key={comment.id}>
            <Typography variant="body2">{comment.content}</Typography>
          </div>
        ))
      ) : (
        <Typography variant="body2">No comments yet.</Typography>
      )}
    </Container>
  );
};

export default PostPage;
