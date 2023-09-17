import {
  List,
  Paper,
  Stack,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  CircularProgress,
} from "@mui/material";

import { usePosts } from "../hooks/usePosts";

export function Posts() {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Stack component="article" flexWrap="nowrap" spacing={1}>
      <Typography variant="h3">Posts</Typography>
      <Divider />
      <Typography>Look for posts, you can up/down vote too</Typography>
      <List disablePadding>
        {posts.length === 0 && (
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ marginBottom: (theme) => theme.spacing(2) }}
          >
            <ListItem>
              <ListItemText primary="No posts, yet" secondary="Zzz..." />
            </ListItem>
          </Paper>
        )}
        {posts.map((post) => (
          <Paper
            elevation={3}
            key={post._id}
            sx={{ marginBottom: (theme) => theme.spacing(2) }}
          >
            <ListItem>
              <ListItemText primary={post.title} secondary={post.body} />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Stack>
  );
}
