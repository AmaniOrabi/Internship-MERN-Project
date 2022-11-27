import React from "react";
import { Container, Toolbar, Typography } from "@mui/material";

function Footer() {
  return (
    <div className="footer" position="static" color="primary">
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            © 2022 Cognira
          </Typography>
        </Toolbar>
      </Container>
    </div>
  );
}
export default Footer;
