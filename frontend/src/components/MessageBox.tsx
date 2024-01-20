import React from "react";
import Alert from "@mui/material/Alert";
type MessageBoxProps = {
  variant?: string;
  children: React.ReactNode;
};

const MessageBox: React.FC<MessageBoxProps> = ({
  variant = "filled",
  children,
}) => {
  return (
    <Alert variant={variant} severity="error">
      {children}
    </Alert>
  );
};
//
export default MessageBox;
