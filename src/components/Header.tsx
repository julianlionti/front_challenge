import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  IconButton,
  Collapse,
} from "@material-ui/core";
import React, { useState } from "react";
import useLang from "../hooks/useLang";
import { ArrowBack } from "@material-ui/icons";

interface Props {
  goBack?: boolean;
  onBack?: () => void;
}

export default ({ goBack, onBack }: Props) => {
  const { setLang, lang, availableLangs } = useLang();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const classes = useClasses();

  return (
    <AppBar position="static">
      <Toolbar>
        <Collapse timeout="auto" in={goBack}>
          <IconButton color={"inherit"} onClick={onBack}>
            <ArrowBack />
          </IconButton>
        </Collapse>
        <Typography variant="h6" className={classes.title}>
          Front Challenge
        </Typography>
        <Button onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
          {availableLangs.find((l) => l.id === lang)?.title}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          {availableLangs.map(({ id, title }) => (
            <MenuItem
              key={id}
              onClick={() => {
                setLang(id);
                setAnchorEl(null);
              }}
            >
              {title}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const useClasses = makeStyles((theme) => ({
  title: { flexGrow: 1 },
}));
