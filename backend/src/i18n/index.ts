import middleware from "i18next-http-middleware";
import i18next from "i18next";
import FsBackend from "i18next-fs-backend";

i18next
  .use(FsBackend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    lng: "en",
    preload: ["en", "ar"],
    ns: ["validations", "success"], // Define your namespaces here
    defaultNS: "validations", // Set the default namespace if needed
    backend: {
      loadPath: `./src/locales/{{lng}}/{{ns}}.json`,
    },
  });

export default i18next;
