import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { CreateUserData } from "../models/CreateUserData";
import axios from "axios";

const Signup = () => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const signUpUser = async (data: CreateUserData) => {
    axios
      .post("http://localhost:8000/auth/signup", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const onFormSubmit = (data: FieldValues) => {
    console.log("form data: ", data);
    signUpUser(data as CreateUserData);
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
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onFormSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "Firstname is required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    autoFocus
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Lastname is required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    type="email"
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    type="password"
                    fullWidth
                    label="Password"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={"span"} href="#" variant="body2">
                <RouterLink to={`/login`}>
                  Already have an account? Sign in
                </RouterLink>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
