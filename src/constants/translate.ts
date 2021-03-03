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
      },
      search: {
        fr: "Chercher",
        en: "Search",
      },
      noResultsFor: {
        fr: "Aucun résultat pour",
        en: "No results for",
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
    coacheeAbs:
    {
      due:{
        en:"Due on: ",
        fr:"Dû le: ",
      },
      complete:{
        en:"Completed on: ",
        fr:"Terminé le:",
      },
      pastDue:{
        en:"Past Due: ",
        fr:"En souffrance: ",
      },
      unassign:{
        en:"Unassigned",
        fr:"Non attribué",
      }
    },
    updateAbs:{
      updateTitle:{
        en:"Update Due Date",
        fr:"Mettre à jour la date d'échéance",
      },
      viewTitle:{
        en:"View Completed Module",
        fr:"Afficher le module terminé",
      },
      newTitle:{
        en:"Assign New Module",
        fr:"Attribuer un nouveau module",
      },
      originalDate:{
        en:"Original Due Date",
        fr:"Date d'échéance originale",
      },
      due:{
        en:"Due on ",
        fr:"Dû le ",
      },
      complete:{
        en:"Completed on ",
        fr:"Terminé le ",
      },
      assign:{
        en:"Assigned on",
        fr:"Attribué le",
      },
      assignTo:{
        en:"assigned to",
        fr:"assigné à",
      },
      selectDate:{
        en:"Select New Due Date",
        fr:"Sélectionnez une nouvelle date d'échéance",
      },
      selectDueDate:{
        en:"Select Due Date",
        fr:"Sélectionnez la date d'échéance",
      },
      updateButton:{
        en:"UPDATE DUE DATE",
        fr:"MISE À JOUR DATE D'ÉCHÉANCE",
      },
      completeButton:{
        en:"MARK AS COMPLETE",
        fr:"MARQUER COMME COMPLET",
      },
      returnButton:{
        en:"BACK",
        fr:"RETOUR",
      },
      assignButton:{
        en:"ASSIGN MODULE",
        fr:"ASSIGNER LE MODULE",
      },
      dateError:{
        en:"You have to pick a valid date",
        fr:"Vous devez choisir une date valide",
    },
    updateSuccess:{
      en:"due date is updated",
      fr:"la date d'échéance est mise à jour",
    },
    completeSuccess:{
      en:"is marked completed for",
      fr:"est marqué comme terminé pour",
    },
    noData:{
      en:"There is no data to display, check your connection",
      fr:"Il n'y a aucune donnée à afficher, vérifiez votre connexion",
    }
    },
    abs:{
      create:{
        en:"CREATE NEW ABS",
        fr:"CRÉER UN NOUVEL ABS",
      },
      view:{
        en:"CURRENT ABS",
        fr:"ABS ACTUEL",
      },
      update:{
        en:"UPDATE/DELETE ABS",
        fr:"METTRE À JOUR / SUPPRIMER L'ABS",
      }
      
    },
    absCreate:{
      title:{
        en:"Create New ABS",
        fr:"Créer un nouvel ABS",
      },
      placeholder:{
        en:"ABS Module Name",
        fr:"Nom du module ABS",
      },
      button:{
        en:"CREATE",
        fr:"CRÉER",
      },
      error:{
        en:"Module name is required",
        fr:"Le nom du module est obligatoire",
      },
      success:{
        en:"is created",
        fr:"est créé",
      }

    },
    absDisplay:{
      title:{
        en:"Module: ",
        fr:"Module: ",
      },
      subtitle:{
        en:"Module id: ",
        fr:"ID du module: ",
      }

    },
    absCRUD:{
      title:{
        en:"Module: ",
        fr:"Module: ",
      },
      subtitle:{
        en:"Module id: ",
        fr:"ID du module: ",
      }
    },
    absUpdate:{
      title:{
        en:"Update ABS Module",
        fr:"Mettre à jour le module ABS",
      },
      previousName:{
        en:"Previous Module Name",
        fr:"Nom du module précédent",
      },
      newName:{
        en:"New Module Name",
        fr:"Nouveau nom de module",
      },
      updateButton:{
        en:"UPDATE",
        fr:"METTRE À JOUR",
      },
      deleteButton:{
        en:"DELETE THIS MODULE",
        fr:"SUPPRIMER CE MODULE",
      },
      return:{
        en:"BACK",
        fr:"RETOUR",
      },
      nameError:{
        en:"New module name cannot be empty",
        fr:"Le nouveau nom de module ne peut pas être vide",
      },
      nameSuccess:{
        en:"Module name is updated",
        fr:"Le nom du module est mis à jour",
      },
      deleteSuccess:{
        en:"Module has been deleted",
        fr:"Le module a été supprimé",
      },
      noData:{
        en:"There is no data to display, check your connection",
        fr:"Il n'y a aucune donnée à afficher, vérifiez votre connexion",
      },
      deletePopup:{
        en:"Are you sure to delete this module?",
        fr:MISSING_TRANSLATION,
      }
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
