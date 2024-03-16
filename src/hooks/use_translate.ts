import { useTranslation } from "react-i18next"

export default function useTranslate() {
  const { t: translate, i18n, ready } = useTranslation()

  const currentLanguage = i18n.language

  function changeLanguage(newLang: "tr" | "en") {
    i18n.changeLanguage(newLang)
  }

  return { ready, currentLanguage, changeLanguage, translate }
}
