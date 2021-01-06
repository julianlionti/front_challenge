import { Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import useLang from "../hooks/useLang";
import Ability from "./Ability";

export interface UrlProps {
  name: string;
  url: string;
}

interface AbilitiesProps {
  ability: UrlProps;
  is_hidden: boolean;
  slot: number;
}

export interface DetailProps {
  name: string;
  abilities: AbilitiesProps[];
  id: number;
  sprites: {
    front_default: string;
    back_default: string;
    back_shiny: string;
    front_shiny: string;
  };
  height: number;
  weight: number;
  species: { name: string; url: string };
  base_experience: number;
  moves: any[];
}

interface Props {
  detail: DetailProps;
}

const capitalize = (s: string) =>
  s.toLowerCase().charAt(0).toUpperCase() + s.toLowerCase().slice(1);

export default ({ detail }: Props) => {
  const {
    species,
    name,
    sprites,
    abilities,
    height,
    weight,
    base_experience,
    moves,
  } = detail;
  const classes = useClasses();
  const { lang, commons } = useLang();

  const renderCol = useCallback(
    (title, value) => {
      return (
        <div className={classes.inner}>
          <Typography>{title}</Typography>
          <Typography>{value}</Typography>
        </div>
      );
    },
    [classes]
  );

  return (
    <Paper variant="outlined" className={classes.root}>
      <figure>
        <img
          className={classes.images}
          alt={`${name}-front`}
          src={sprites.front_default}
        />
        <img
          className={classes.images}
          alt={`${name}-back`}
          src={sprites.back_default}
        />
      </figure>
      <Typography variant="h5" component="h2">
        {`${capitalize(name)} - ${species.name}`}
      </Typography>
      <Divider className={classes.divider} />
      <Typography variant="h6" component="h3" className={classes.title}>
        {commons.description[lang]}
      </Typography>
      <div className={classes.description}>
        {renderCol(commons.height[lang], height)}
        {renderCol(commons.weight[lang], weight)}
      </div>
      <div className={classes.description}>
        {renderCol(commons.experience[lang], base_experience)}
        {renderCol(commons.total_moves[lang], moves.length)}
      </div>
      <Typography variant="h6" component="h3" className={classes.title}>
        {commons.ability[lang]}
      </Typography>
      {abilities.map((ability) => (
        <Ability key={ability.ability.name} {...ability} />
      ))}
    </Paper>
  );
};

const useClasses = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  images: {
    height: 110,
    width: 110,
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  description: {
    display: "flex",
    flexDirection: "row",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
}));
