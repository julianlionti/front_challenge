import {
  Paper,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useState } from "react";
import AriaLabels from "../utils/AriaLabels";

export interface PokeProps {
  name: string;
  url: string;
}

interface Props {
  data?: PokeProps[];
  onSelect: (poke: PokeProps) => void;
  total?: number;
  onChangePage: (page: number) => void;
}

export default ({ data, onSelect, total, onChangePage }: Props) => {
  const [page, setPage] = useState(1);
  const classes = useClasses();

  return (
    <Paper>
      <List aria-label={AriaLabels.pokeList}>
        {data?.map((poke) => {
          const { name, url } = poke;
          return (
            <ListItem
              aria-label={AriaLabels.pokeItem}
              button
              divider
              key={url}
              onClick={() => onSelect(poke)}
            >
              <ListItemText primary={name} />
            </ListItem>
          );
        })}
      </List>
      {total && (
        <div className={classes.pagination}>
          <Pagination
            count={Math.floor(total / 5)}
            size="small"
            page={page}
            variant="outlined"
            siblingCount={1}
            boundaryCount={1}
            onChange={(e, number) => {
              setPage(number);
              onChangePage(number);
            }}
          />
        </div>
      )}
    </Paper>
  );
};

const useClasses = makeStyles((theme) => ({
  pagination: {
    padding: theme.spacing(1.5),
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
  },
}));
