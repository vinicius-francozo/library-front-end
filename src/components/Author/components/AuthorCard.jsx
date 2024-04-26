import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context";
import { DELETE_AUTHOR } from "../../../service";
import { useMutation } from "@apollo/client";

export default function AuthorForm(props) {
  const { author } = props;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [deleteAuthor, { error }] = useMutation(DELETE_AUTHOR);

  const handleDelete = async () => {
    await deleteAuthor({ variables: { id: `${author.id}` } });
    if (!error) navigate("/author", { state: { openSnackbar: true } });
  };
  console.log(author);

  return (
    <Grid item xs={12} lg={props.lg || 3}>
      <Card
        sx={{
          maxWidth: props.width || 345,
          backgroundColor: "#cdcf81d6",
        }}
      >
        <CardHeader
          title={`${author?.name} ${author?.surname}`}
          subheader={`${new Date(author?.birth_date).toLocaleDateString()} - ${author?.country}`}
          sx={{
            "& div": {
              width: "100%",
              "& span": {
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              },
            },
          }}
        />
        <CardMedia
          component="img"
          height={props.height || "194"}
          image={author?.picture}
          alt="author picture"
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {author?.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {props.seeMore ? (
            <Button>
              <Link
                style={{ color: "darkolivegreen" }}
                to={`/author/show/${author?.id}`}
              >
                Ver Mais
              </Link>
            </Button>
          ) : (
            <>
              {user?.id == author.user.id && (
                <Button>
                  <Link
                    style={{ color: "darkolivegreen" }}
                    to={`/author/update/${author?.id}`}
                  >
                    Editar
                  </Link>
                </Button>
              )}
              {user?.id == author.user.id && (
                <Button
                  sx={{
                    color: "darkolivegreen",
                    textDecoration: "underline !important",
                  }}
                  onClick={handleDelete}
                >
                  Excluir
                </Button>
              )}
              <Button>
                <Link style={{ color: "darkolivegreen" }} to="/author">
                  Voltar
                </Link>
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
