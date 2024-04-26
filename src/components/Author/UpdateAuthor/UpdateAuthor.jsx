import { Container, Paper, Box, Typography } from "@mui/material";
import { AuthorForm } from "../components";
import { useEffect, useState } from "react";
import { BackDrop } from "../../Utils";
import { GET_AUTHOR_BY_ID } from "../../../service";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

export default function UpdateBook() {
  const [author, setAuthor] = useState();
  const { authorId } = useParams();
  const { data, loading } = useQuery(GET_AUTHOR_BY_ID, {
    variables: { id: authorId },
  });

  useEffect(() => {
    setAuthor(data?.findOneAuthor);
  }, [data]);

  return (
    <Container sx={{ height: "100vh", paddingBlock: 2 }}>
      <Paper
        sx={{
          backgroundColor: "rgba(150, 142, 99, 0.932)",
          width: "100%",
          height: "100%",
          padding: 4,
          borderRadius: 3,
        }}
        elevation={19}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          height="80vh"
        >
          <Typography variant="h4" fontSize="300" color={"#e1ebf3"}>
            Atualizar Livro...
          </Typography>
          {author && <AuthorForm author={author} method={"PUT"} />}
        </Box>
      </Paper>
      <BackDrop open={loading} />
    </Container>
  );
}
