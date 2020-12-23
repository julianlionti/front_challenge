import { useCallback, useContext } from "react";
import { LangContext, LangType } from "../utils/LangContext";

interface AvailableProps {
  id: LangType;
  title: string;
}

const availableLangs: AvailableProps[] = [
  { id: "es", title: "Español" },
  { id: "en", title: "English" },
  { id: "de", title: "Deutsche" },
];

export default () => {
  const [translation, setTranslation] = useContext(LangContext);

  const setLang = useCallback(
    (lang: LangType) => {
      setTranslation((act) => ({ ...act, lang }));
      localStorage.setItem("lang", lang);
    },
    [setTranslation]
  );

  return { setLang, lang: translation.lang, availableLangs };
};
