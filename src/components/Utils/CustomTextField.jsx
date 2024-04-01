import { TextField } from "@mui/material";

export default function CustomTextField(props) {
  const register = props?.register || {};
  return (
    <TextField
      InputLabelProps={{ ...props.labelProps }}
      sx={{
        ...props.styling,
        "& label": {
          color: `${props.labelColor} !important` || "black",
        },
        "& .MuiFilledInput-root": {
          color: props.textColor || "white",
          backgroundColor: props.backgroundColor
            ? `${props.backgroundColor} !important`
            : "rgba(205, 226, 229, 0.04) !important",
          backdropFilter: "blur(3.9px)",
          borderRadius: props.borderRadius || 7,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          border: props.errors
            ? "1px solid #d32f2fbf"
            : "1px solid rgba(205, 226, 229, 0.15)",
          transition: "border 0.3s",
          "&:hover": {
            border: props.errors
              ? "1px solid #d32f2f"
              : "1px solid rgba(205, 226, 229, 0.15)",
          },
          "&::before": {
            border: "0 !important",
          },
          "&::after": {
            border: "0 !important",
          },
        },
      }}
      error={!!props.errors}
      {...register}
      helperText={props.errors ?? ""}
      label={props.label}
      id={props.id}
      type={props.type || "text"}
      variant="filled"
    />
  );
}
