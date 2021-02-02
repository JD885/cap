import { createTranslations } from "react-ridge-translations";

// first describe which languages are allowed/required (Typescript)
type TranslationLanguages = {
  fr: string;
  en: string;
};

const deviceLanguage = navigator.language;
const availableLanguages: (keyof TranslationLanguages)[] = ["en", "fr"];
const fallback = "en";

function getBestLanguage():
  | typeof availableLanguages[number]
  | typeof fallback {
  return (
    availableLanguages.find((al) => deviceLanguage.startsWith(al)) || fallback
  );
}

// create a translation object with your translations
const translate = createTranslations<TranslationLanguages>()(
  {
    loginPage: {
      title: {
        fr: "page de destination",
        en: "Landing Page",
      },
      bypass: {
        fr: "contourner l'authentification",
        en: "bypass authentication",
      },
      username: {
        fr: "Nom d'utilisateur",
        en: "Username",
      },
      password: {
        fr:"mot de passe",
        en:"Password"
      },
      login:{
        fr:"s'identifier",
        en:"Login"
      }
    },
    appBar: {
      darkMode: {
        fr: "mode sombre",
        en: "Dark Mode",
      },
    },
    layoutPage: {
      mainMenu: {
        fr: "page du menu principal",
        en: "Main Menu Page",
      },
      coachee:{
        fr:"SÉLECTEUR D'ENTRAÎNEUR",
        en:"COACHEE SELECTOR"
      },
      quality:{
        fr:"TRACKER DE QUALITÉ",
        en:"QUALITY TRACKER"
      },
      dashboard:{
        fr:"TABLEAU DE BORD",
        en:"DASHBOARD"
      }
    },
    coacheeSelector: {
      title: {
        fr: "Implémentation du sélecteur de coaché",
        en: "Coachee Selector Implementation",
      },
      goto:{
        fr: "aller à la page coaché",
        en: "go to coachee page",
      }
    },
    coacheePage: {
      coachee:{
        fr:"coaché",
        en:"coachee"
      },
      tabTouchpoint: {
        fr: "point de contact",
        en: "Touchpoints",
      },
      tabABSModules:{
        fr: "Modules ABS",
        en: "ABS Modules",
      },
      tabSurvey:{
        fr: "Sondage",
        en: "Survey",
      }
    },
    qualityTracker:{
      recent:{
        fr:"no translation yet",
        en:"Recent Touchpoints"
      },
      personal:{
        fr:"no translation yet",
        en:"Personal Notes"
      }
    }
  },
  {
    language: getBestLanguage(),
    fallback: "en",
  }
);
export {translate};
