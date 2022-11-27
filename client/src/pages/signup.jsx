import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  IconButton,
  Toolbar,
  Alert,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "../components/header";
import { useState } from "react";
import { ReactComponent as ShowPwd } from "../assets/images/eye-password-show-svgrepo-com.svg";
import { ReactComponent as HidePwd } from "../assets/images/eye-password-hide-svgrepo-com.svg";
import { useSignup } from "../hooks/useSignup";

const paperStyle = {
  padding: 70,
  width: 280,
  margin: "20px auto",
};
const btnstyle = { margin: "8px 0" };

const validationSchema = yup.object({
  firstName: yup.string("First Name").required("First Name is required"),
  lastName: yup.string("Last Name").required("Last Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function Signup() {
  const { signup, isLoading, error } = useSignup();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await signup(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );
      //alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });
  console.log(formik.values);

  return (
    <>
      <Grid>
        <Toolbar>
          <Header />
        </Toolbar>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <h2>Sign up</h2>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
            </Grid>
            <br />
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </Grid>
            <br />
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
            {formik.errors.email ? (
              <>
                <br />
                <Alert severity="error"> {formik.errors.email}</Alert>
              </>
            ) : null}
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
                {passwordShown ? <ShowPwd /> : <HidePwd />}
              </IconButton>
            </Grid>
            {formik.errors.password ? (
              <Alert severity="error"> {formik.errors.password}</Alert>
            ) : null}
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
            <br />
            <br />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              disabled={isLoading}
            >
              Sign up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <br/>
                <Link to="/login" style={{ color: "grey" }}>
                  Already have an account? Log in
                </Link>
              </Grid>
              {error && <Alert severity="error"> {error}</Alert>}
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default Signup;
