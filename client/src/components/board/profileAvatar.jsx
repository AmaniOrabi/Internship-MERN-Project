import React from "react";
import { IconButton } from "@mui/material";
import { useLogout } from "../../hooks/useLogout";
import LogoutIcon from "@mui/icons-material/Logout";

export default function ProfileAvatar() {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <IconButton
        size="small"
        sx={{ position: "relative", left: "1450px", top: "-37px" }}
        onClick={handleLogout}
      >
        <LogoutIcon />
      </IconButton>
    </div>
  );
}
