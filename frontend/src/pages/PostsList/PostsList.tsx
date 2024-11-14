import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/postSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import PostCard from "./PostCard/PostCard";
import Grid from "@mui/material/Grid2";

const Posts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        wrap="wrap"
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {posts.map((post: any) => (
          <Grid key={post.id} size={4}>
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              id={post.id}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Posts;
