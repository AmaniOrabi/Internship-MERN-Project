import React from "react";
import * as reactIconsFa from "https://cdn.skypack.dev/react-icons@4.2.0/fa";
import * as yup from "yup";
import Header from "../components/header";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import { useState } from "react";
import { ReactComponent as ShowPwd } from "../assets/images/eye-password-show-svgrepo-com.svg";
import { ReactComponent as HidePwd } from "../assets/images/eye-password-hide-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

import {
  Grid,
  Paper,
  TextField,
  Button,
  IconButton,
  Divider,
  Toolbar,
  Alert,
} from "@mui/material";

const { FaPlusCircle } = reactIconsFa;

const paperStyle = {
  padding: 70,
  width: 280,
  margin: "20px auto",
};

const btnstyle = { margin: "8px " };

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const navigateSignup = () => {
    navigate("/signup");
  };

  const { login, isLoading, error } = useLogin();

  //hide or show password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  //form handling using formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await login(values.email, values.password);
      //alert(JSON.stringify(values, null, 2));
      resetForm();
      console.log(values);
    },
  });

  return (
    <div className="login">
      <Grid>
        <Toolbar>
          <Header />
        </Toolbar>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <h2>Log In</h2>
            <br />
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <br />

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type={passwordShown ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                />

              <IconButton
                onClick={togglePassword}
                style={{ marginLeft: "230px", marginTop: "-75px" }}
                >
                {passwordShown ? <ShowPwd /> : <HidePwd />}{" "}
              </IconButton>
            </Grid>
            {error && <Alert severity="error"> {error}</Alert>}

            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
              sx={{ margin: "auto" }}
              />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              disabled={isLoading}
            >
              Log in
            </Button>
          </form>
          <Divider>OR</Divider>

          <Button
            color="success"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={navigateSignup}
          >
            <i
              className="material-icons"
              style={{ paddingRight: "15px", paddingTop: "3px" }}
            >
              <FaPlusCircle />
            </i>
            Sign up
          </Button>
        </Paper>
      </Grid>
    </div>
  );
}

export default Login;
