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
      schedule:{
        fr:"Planifier le point de contact",
        en:"Schedule Touchpoint"
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
    },
    scheduleTouchpoint:{
      title:{
        fr:"Planificateur de points de contact",
        en:"Touchpoint Scheduler"
      },
      button:{
        fr:"Planifier le point de contact",
        en:"Schedule Touchpoint"
      },
      coachee:{
        fr:"Coaché",
        en:"Coachee"
      },
      none:{
        fr:"aucun",
        en:"none"
      },
      type:{
        fr:"Type de point de contact",
        en:"Touchpoint Type"
      },
      date:{
        fr:"Date du point de contact",
        en:"Touchpoint Date"
      },
      time:{
        fr:"Temps de point de contact",
        en:"Touchpoint Time"
      },
      coacheeError:{
        fr:"Le champ Coachee ne peut pas être vide",
        en:"Coachee field cannot be empty"
      },
      typeError:{
        fr:"Le champ de type ne peut pas être vide",
        en:"Type field cannot be empty"
      },
      dateError:{
        fr:"Heure ou date invalide",
        en:"Invalid time or date"
      },
    }
  },
  {
    language: getBestLanguage(),
    fallback: "en",
  }
);
export {translate};
