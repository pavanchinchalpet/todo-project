import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ display: "flex", gap: 1, mb: 2 }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="New Todo"
        fullWidth
      />
      <Button variant="contained" type="submit">Add</Button>
    </Box>
  );
}
