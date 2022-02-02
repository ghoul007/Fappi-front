const nextButtons = [
  {
    classes: 'shepherd-button-primary',
    text: 'Retour',
    type: 'back'
  },
  {
    classes: 'shepherd-button-primary',
    text: 'Suivant',
    type: 'next'
  }
];
const endButtons = [
  {
    classes: 'shepherd-button-primary',
    text: 'Fermer',
    type: 'next'
  }
];

export const tourAdminSteps = [
  {
    id: 'intro',
    buttons: nextButtons,
    cancelIcon: {
      enabled: true
    },
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Gestion des utilisateurs',
    text: ['Ici vous pouvez gérer les différents utilisateurs de votre plateforme.'],
  },

  // show user menu
  {
    id: 'user-menu',
    attachTo: {
      element: '.tour-list-users',
      on: 'bottom'
    },
    buttons: nextButtons,
    cancelIcon: {
      enabled: true
    },
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Liste des utilisateurs',
    text: ['Voici la liste des utilisateurs de l\'organisation courante.'],
  },
// add user
  {
    id: 'user-menu',
    attachTo: {
      element: '.tour-add-button',
      on: 'bottom'
    },
    buttons: nextButtons,
    cancelIcon: {enabled: true},
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Ajout',
    text: ['Ajoutez un utilisateur'],
    when: {
      hide: () => {
        (document.querySelector('.tour-add-button') as any).click();
      }
    }
  },
  // add user form
  {
    id: 'user-menu',
    attachTo: {
      element: '[formcontrolname="organizationId"]',
      on: 'right'
    },
    beforeShowPromise: () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), 1000);
      });
    },
    buttons: nextButtons,
    cancelIcon: {enabled: true},
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Organisation',
    text: ['L\'organisation par defaut de l\'utilisateur'],

  },
  {
    id: 'user-menu',
    attachTo: {
      element: '[formcontrolname="username"]',
      on: 'right'
    },
    buttons: nextButtons,
    cancelIcon: {enabled: true},
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Username',
    text: ['Le login de l\'utilisateur, utilisé pour se connecter.'],
  },
  {
    attachTo: {
      element: '[formcontrolname="password"]',
      on: 'right'
    },
    buttons: nextButtons,
    cancelIcon: {enabled: true},
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Password',
    text: ['Le mot de passe de l\'utilisateur'],
    when: {
      hide: () => {
        (document.querySelector('.cancel-button') as any).click();
      }
    }
  },
  {
    attachTo: {
      on: 'right'
    },
    buttons: endButtons,
    cancelIcon: {enabled: true},
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Merci !',
    text: ['Prochaines étapes : associez des utilisateurs avec des groupes'],
  },

];
