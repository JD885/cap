import { createTranslations } from "react-ridge-translations";

// first describe which languages are allowed/required (Typescript)
type TranslationLanguages = {
  fr: string;
  en: string;
};

const deviceLanguage = navigator.language;
export const availableLanguages: (keyof TranslationLanguages)[] = ["en", "fr"];
const fallback = "en";

function getBestLanguage():
  | typeof availableLanguages[number]
  | typeof fallback {
  return (
    availableLanguages.find((al) => deviceLanguage.startsWith(al)) || fallback
  );
}

const MISSING_TRANSLATION= 'MISSING TRANSLATION'

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
        en: "Main Menu",
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
      }
    },
    coacheePage: {
      coachee:{
        fr:"coaché",
        en:"coachee"
      },
      touchpoints: {
        fr: "point de contact",
        en: "Touchpoints",
      },
      abs:{
        fr: "Module ABS",
        en: "ABS Module",
      },
      abss:{
        fr: "Modules ABS",
        en: "ABS Modules",
      },
      survey:{
        fr: "Sondage",
        en: "Survey",
      },
      surveys:{
        fr: "Enquêtes",
        en: "Surveys",
      },
      pastDue:{
        fr: "en souffrance",
        en: "past due",
      },
      nothingDue:{
        fr: "Rien de prévu dans les deux prochaines semaines.",
        en: "Nothing due in the next two weeks.",
      },
      dueIn:{
        fr: "dû dans",
        en: "due in",
      },
      team:{
        fr: "Équipe",
        en: "Team",
      },
      office:{
        fr: "Bureau",
        en: "Office",
      },
      building:{
        fr: "Bâtiment",
        en: "Building",
      },
      workLocation:{
        fr: "Lieu de travail",
        en: "Work location",
      },
      editCoachee:{
        fr: "Modifier le coaché",
        en: "Edit coachee",
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
      notes:{
        fr:MISSING_TRANSLATION,
        en:"Meeting Notes:"
      }
    },
    AddNewCoachee:{
      Title:{
        en:'Add New Coachee',
        fr:MISSING_TRANSLATION,
      },
      firstName:{
        en:'First Name',
        fr:MISSING_TRANSLATION,
      },
      firstNameError:{
        en:'First name is needed',
        fr:MISSING_TRANSLATION,
      },
      lastName:{
        en:'Last Name',
        fr:MISSING_TRANSLATION,
      },
      lastNameError:{
        en:'A last name is needed',
        fr:MISSING_TRANSLATION,
      },
      cellphone:{
        en:'Cellphone',
        fr:MISSING_TRANSLATION,

      },
      cellphoneError:{
        en:"A cellphone is required",
        fr:MISSING_TRANSLATION,
      },
      email:{
        en:'Email',
        fr:MISSING_TRANSLATION,
      },
      emailERROR:{
        en:'A email is required',
        fr:MISSING_TRANSLATION,
      },
      officeNumber:{
        en:'Office Number',
        fr:MISSING_TRANSLATION,
      },
      officeNumberError:{
        en:'A office number is needed with a area code',
        fr:MISSING_TRANSLATION
      },
      building:{
        en:'WorkLocation',
        fr:MISSING_TRANSLATION,
      },
      buildingError:{
        en:'A building address is required',
        fr:MISSING_TRANSLATION,
      },
      workloaction:{
        en:'Work Location',
        fr:MISSING_TRANSLATION,
      },
      workloactionError:{
        en:'A work loaction is required',
        fr:MISSING_TRANSLATION,
      },
      survey:{
        en:'Survey Completed',
        fr:MISSING_TRANSLATION,
      },
      surveyError:{
        en:'which survey has been completed',
        fr:MISSING_TRANSLATION,
      },
      CAP:{
        en:'CAP Completed',
        fr:MISSING_TRANSLATION,
      },
      company:{
        en:'Company',
        fr:MISSING_TRANSLATION,
      },
      department:{
        en:'Department',
        fr:MISSING_TRANSLATION,
      },
      manager:{
        en:'managers',
        fr:MISSING_TRANSLATION,
      },
      supervisor:{
        en:'Supervisor',
        fr:MISSING_TRANSLATION,
      },
      vp:{
        en:'Vice President',
        fr:MISSING_TRANSLATION,
      },
      submit:{
        en:'Submit',
        fr:MISSING_TRANSLATION,
      },
      snackMessage:{
        en:'Success on adding coachee!!',
        fr:MISSING_TRANSLATION,
      },
    },
    setting:{
      language:
      {
        en:"Language",
        fr:MISSING_TRANSLATION,
      },
      darkMode:
      {
        en:"Dark Mode",
        fr:MISSING_TRANSLATION,
      },
      profilePic:
      {
        en:"Update Profile Picture",
        fr:MISSING_TRANSLATION,
      },
    },
    survey:{
      results:{
        en:"Results",
        fr: MISSING_TRANSLATION
      },
      edit:{
        en:"Edit",
        fr: MISSING_TRANSLATION
      },
      cancel:{
        en:"Cancel",
        fr: MISSING_TRANSLATION
      },
      create:{
        en:"Create",
        fr: MISSING_TRANSLATION
      },
      update:{
        en:"Update",
        fr: MISSING_TRANSLATION
      },
      newrecord:{
        en:"New Record",
        fr: MISSING_TRANSLATION
      },
      avgScore:{
        en:"Average Score",
        fr: MISSING_TRANSLATION
      },
      assnDate:{
        en:"Assigned Date",
        fr: MISSING_TRANSLATION
      },
      dueDate:{
        en:"Due Date",
        fr: MISSING_TRANSLATION
      },
      complDate:{
        en:"Survey Completion Date",
        fr: MISSING_TRANSLATION
      },

    },
    languageSelect:
    {
      english:
      {
        en:"English",
        fr:MISSING_TRANSLATION+"(english)",
      },
      french:
      {
        en:"French",
        fr:MISSING_TRANSLATION+"(french)",
      },
    },
    Triad:{
      notes:{
        fr:MISSING_TRANSLATION,
        en:"Meeting Notes:"
      },
      goals:
      {
        fr:MISSING_TRANSLATION,
        en:"Goals"
      },
      observations:
      {
        fr:MISSING_TRANSLATION,
        en:"Observations"
      },
      opportunities:
      {
        fr:MISSING_TRANSLATION,
        en:"Opportunities"
      },
      commitments:
      {
        fr:MISSING_TRANSLATION,
        en:"Commitments"
      },
      meetingNotesTitle:
      {
        fr:MISSING_TRANSLATION,
        en:"Meeting notes from "
      },
      allCapItems:
      {
        fr:MISSING_TRANSLATION,
        en:"All CAPs"
      },
      triadSaved:
      {
        fr:MISSING_TRANSLATION,
        en:"Triad notes successfully saved!"
      },
      capGraduated:
      {
        fr:MISSING_TRANSLATION,
        en:"Cap Graduated!"
      }
    }
  
  },
  {
    language: getBestLanguage(),
    fallback: "en",
  }
);
export {translate};
