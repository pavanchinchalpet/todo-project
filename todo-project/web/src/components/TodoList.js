import React from "react";
import { List, ListItem, ListItemText, IconButton, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TodoList({ todos = [], onToggle, onDelete }) {
  if (!todos.length) return <div>No todos yet — add one!</div>;

  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo._id}
          secondaryAction={
            <IconButton edge="end" onClick={() => onDelete(todo._id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <Checkbox checked={todo.completed} onChange={() => onToggle(todo._id)} />
          <ListItemText primary={todo.text} sx={{ textDecoration: todo.completed ? "line-through" : "none" }} />
        </ListItem>
      ))}
    </List>
  );
}
