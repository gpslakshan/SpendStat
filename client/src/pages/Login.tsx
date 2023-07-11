import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FieldValues, useForm, Controller } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const signInUser = async (data: any) => {
    axios
      .post("http://localhost:8000/auth/login", data)
      .then((res) => {
        console.log("Login succesful", res);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const onFormSubmit = (data: FieldValues) => {
    console.log("form data: ", data);
    signInUser(data);
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onFormSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                error={!!error}
                onChange={onChange}
                value={value}
                fullWidth
                label="Email Address"
                variant="outlined"
                autoFocus
                margin="dense"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                error={!!error}
                onChange={onChange}
                value={value}
                type="password"
                fullWidth
                label="Password"
                variant="outlined"
                margin="dense"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={"span"} href="#" variant="body2">
                <RouterLink to={`/register`}>
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
