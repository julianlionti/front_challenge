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

const dev = "Julián Lionti";
const commons = {
  developed: {
    es: `Desarrollado por ${dev} ✌🏼`,
    en: `Developed by ${dev} ✌🏼`,
    de: `Entwickelt von ${dev} ✌🏼`,
  },
  title: { es: "Desafío Front", en: "Front Challenge", de: "Herausforderung" },
  description: { es: "Descripción", en: "Description", de: "Beschreibung" },
  ability: { es: "Habilidades", en: "Abilities", de: "Kompetenzen" },
  height: { es: "Altura", en: "Height", de: "Höhe" },
  weight: { es: "Peso", en: "Weight", de: "Gewicht" },
  experience: { es: "Experiencia", en: "Experience", de: "Erfahrung" },
  total_moves: {
    es: "Movimientos totales",
    en: "Total moves",
    de: "Gesamtbewegungen",
  },
};

export default () => {
  const [translation, setTranslation] = useContext(LangContext);

  const setLang = useCallback(
    (lang: LangType) => {
      setTranslation((act) => ({ ...act, lang }));
      localStorage.setItem("lang", lang);
    },
    [setTranslation]
  );

  return { setLang, lang: translation.lang, availableLangs, commons };
};
