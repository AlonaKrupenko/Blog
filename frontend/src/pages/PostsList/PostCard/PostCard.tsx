import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  title: string;
  content: string;
  id: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, id }) => {
  const navigate = useNavigate();

  const handleReadClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        marginBottom: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleReadClick}>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
