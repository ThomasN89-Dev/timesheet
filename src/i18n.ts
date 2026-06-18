import i18n from "i18next";
import it from "@/locales/it/it.json";
import en from "@/locales/en/en.json";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "it",
  resources: {
    it: { translation: it },
    en: { translation: en },
  },
});
export default i18n;
