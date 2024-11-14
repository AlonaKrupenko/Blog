import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPostById } from "../../redux/postSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPost, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <Typography variant="h4">{currentPost?.title}</Typography>
      <Typography variant="body1">{currentPost?.content}</Typography>

      <Button variant="contained" color="warning">
        Edit Post
      </Button>
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete Post
      </Button>
      <Typography variant="h6">Comments</Typography>

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
