import { CircularProgress, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import useLang from "../hooks/useLang";

interface Ability {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

interface Props {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
}

export default ({ ability: { url } }: Props) => {
  const { lang } = useLang();
  const [abilityResponse, loading] = useFetch<Ability>({ onInit: { url } });

  const ab = useMemo(
    () =>
      abilityResponse?.flavor_text_entries.find(
        (e) => e.language.name === lang
      ),
    [abilityResponse, lang]
  );
  if (!ab || loading) return <CircularProgress />;

  return <Typography>{ab?.flavor_text}</Typography>;
};
