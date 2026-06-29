import { LANGS } from "@/models/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { Button } from "./ui/button";
import { useTheme } from "@/context/ThemeContext";
import { MoonIcon, SunDimIcon } from "lucide-react";
import { useEffect } from "react";

function Header() {
  const { t } = useTranslation();
  const { state, dispatch } = useTheme();
  const languages = LANGS;
  const theme = state.theme;
  function renderLang(lang: string) {
    switch (lang) {
      case "it":
        return t("languages.it");
      case "en":
        return t("languages.en");
      default:
        return t("languages.it");
    }
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleDispatch = () => {
    dispatch({ type: "TOGGLE_THEME" });
    const newTheme = state.theme === "light" ? "dark" : "light";
    localStorage.setItem("themeState", newTheme);
  };

  return (
    <header className="sticky top-0 z-50 flex justify-end items-center px-8 py-3 border-b bg-background">
      <Select
        defaultValue="it"
        onValueChange={(value) => i18n.changeLanguage(value)}
      >
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {languages.map((lang: string) => (
              <SelectItem value={lang} key={lang}>
                {renderLang(lang)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={handleDispatch}>
        {theme === "dark" ? <SunDimIcon /> : <MoonIcon />}{" "}
      </Button>
    </header>
  );
}

export default Header;
