import {
  Collapse,
  LinearProgress,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useMemo } from "react";
import Detail, { DetailProps } from "../components/Detail";
import Header from "../components/Header";
import PokeList, { PokeProps } from "../components/PokeList";
import useFetch from "../hooks/useFetch";

interface ListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeProps[];
}

export default () => {
  const [pokeResponse, loading, call] = useFetch<ListResponse>({
    onInit: {
      url: "https://pokeapi.co/api/v2/pokemon/",
      params: { offset: 0, limit: 5 },
    },
  });

  const [
    detail,
    loadingDetail,
    callDetail,
    cleanDetail,
  ] = useFetch<DetailProps>();

  const isLoading = useMemo(() => loading || loadingDetail, [
    loading,
    loadingDetail,
  ]);

  const { breakpoints } = useTheme();
  const isBig = useMediaQuery(breakpoints.up("sm"));
  const classes = useClasses({ isBig, detail });

  console.log(pokeResponse, loading);

  return (
    <div>
      <Header goBack={!!detail} onBack={() => cleanDetail()} />
      <main className={classes.main}>
        <Collapse in={isLoading} timeout="auto" unmountOnExit>
          <LinearProgress />
        </Collapse>
        <div className={classes.content}>
          <Collapse in={!detail || isBig} className={classes.list}>
            <PokeList
              data={pokeResponse?.results}
              onSelect={({ url, name }) => {
                if (name === detail?.name) cleanDetail();
                else callDetail({ url });
              }}
              onChangePage={(page) =>
                call({ params: { limit: 5, offset: (page - 1) * 5 } })
              }
              total={pokeResponse?.count}
            />
          </Collapse>
          <Collapse in={!!detail} className={classes.detail}>
            {detail && <Detail detail={detail} />}
          </Collapse>
        </div>
      </main>
    </div>
  );
};

interface StyleProps {
  isBig?: boolean;
  detail?: DetailProps;
}
const useClasses = makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2),
  },
  content: ({ isBig }: StyleProps) => ({
    display: "flex",
    flexDirection: isBig ? "row" : "column",
  }),
  list: ({ detail, isBig }: StyleProps) => ({
    flex: !detail || isBig ? 1 : undefined,
    marginRight: theme.spacing(!detail || isBig ? 1 : 0),
  }),
  detail: {
    flex: 1,
  },
}));
