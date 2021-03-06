import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";

const theme = createTheme();

export default function AuthSignUp() {
  const history = useHistory();
  const [signUpValues, setSignUpValues] = React.useState({
    email: "",
    user_name: "",
    password: "",
  });

  const { email, user_name, password } = signUpValues;

  const handleChange = (text) => (event) => {
    setSignUpValues({ ...signUpValues, [text]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(`http://localhost:8000/api/signup`, signUpValues).then(
      (resp) => {
        if (resp.data === "success") {
          alert("You are successfully Registered! Please login");
          history.push("/signin", { some: "data" });
        } else {
          alert("user already exists");
        }
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              autoComplete="none"
              margin="normal"
              //   required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={handleChange("email")}
            />
            <TextField
              autoComplete="none"
              margin="normal"
              //   required
              fullWidth
              id="username"
              label="User Name"
              type="text"
              name="username"
              value={user_name}
              onChange={handleChange("user_name")}
            />
            <TextField
              margin="normal"
              //   required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
