import {
  Collapse,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";

interface ListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export default () => {
  const [page, setPage] = useState(1);
  const [pokeList, loading, call] = useFetch<ListResponse>({
    onInit: {
      url: "https://pokeapi.co/api/v2/ability/",
      params: { offset: 0, limit: 5 },
    },
  });

  const [detail, loadingDetail, callDetail, cleanDetail] = useFetch();
  console.log(detail);

  const isLoading = useMemo(() => loading || loadingDetail, [
    loading,
    loadingDetail,
  ]);

  const classes = useClasses();
  return (
    <div>
      <Header goBack={!!detail} onBack={() => cleanDetail()} />
      <main className={classes.content}>
        <Collapse in={isLoading} timeout="auto" unmountOnExit>
          <LinearProgress />
        </Collapse>
        <Collapse in={!detail}>
          <Paper>
            <List component="nav" aria-label="poke list">
              {pokeList?.results.map(({ name, url }) => (
                <ListItem
                  button
                  divider
                  key={url}
                  onClick={() => {
                    callDetail({ url });
                  }}
                >
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
            {pokeList?.count && (
              <div className={classes.pagination}>
                <Pagination
                  count={Math.floor(pokeList?.count / 5)}
                  size="small"
                  page={page}
                  variant="outlined"
                  siblingCount={1}
                  boundaryCount={1}
                  onChange={(e, number) => {
                    setPage(number);
                    call({ params: { limit: 5, offset: (number - 1) * 5 } });
                  }}
                />
              </div>
            )}
          </Paper>
        </Collapse>
      </main>
    </div>
  );
};

const useClasses = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
  pagination: {
    padding: theme.spacing(1.5),
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
  },
}));
