import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery,
  Fade,
  Popper,
  Paper,
  ClickAwayListener,
} from "@material-ui/core";
import React, { useState } from "react";
import useLang from "../hooks/useLang";
import { ArrowBack, Close, Airplay } from "@material-ui/icons";

interface Props {
  goBack: boolean;
  onBack: () => void;
}

export default ({ goBack, onBack }: Props) => {
  const { setLang, lang, availableLangs, commons } = useLang();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
  const classes = useClasses();

  const { breakpoints } = useTheme();
  const isBig = useMediaQuery(breakpoints.up("sm"));
  const [showDeveloper, setShowDeveloper] = useState<HTMLElement | null>(null);

  return (
    <AppBar position="static">
      <Toolbar>
        <ClickAwayListener
          onClickAway={() => {
            setShowDeveloper(null);
          }}
        >
          <IconButton
            color={"inherit"}
            onClick={({ currentTarget }) => {
              if (!goBack) {
                setShowDeveloper((e) => (e ? null : currentTarget));
              } else {
                onBack();
              }
            }}
          >
            {!goBack ? <Airplay /> : isBig ? <Close /> : <ArrowBack />}
          </IconButton>
        </ClickAwayListener>

        <Typography variant="h6" className={classes.title}>
          {commons.title[lang]}
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
      <Popper open={!!showDeveloper} anchorEl={showDeveloper} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper className={classes.developer}>
              Developed by Julián Lionti. ✌🏼
            </Paper>
          </Fade>
        )}
      </Popper>
    </AppBar>
  );
};

const useClasses = makeStyles((theme) => ({
  title: { flexGrow: 1 },
  developer: { padding: theme.spacing(1) },
}));
