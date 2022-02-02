export const tourAdminSteps = [
  {
    id: 'intro',
    attachTo: {
      element: '.top-menus',
      on: 'bottom'
    },
    beforeShowPromise: () => {
      return new Promise((resolve) => {
        resolve();
      });
    },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
    cancelIcon: {
      enabled: true
    },
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Bienvenue sur FaberApp',
    text: ['Vous êtes actuellement dans la partie administration de FaberApp qui vous permettra de gérer vos' +
    ' utilisateurs, groupes et encore d\'autres choses'],
    when: {
      show: () => {
        console.log('show step');
      },
      hide: () => {
        console.log('hide step');
      }
    }
  },

  // show user menu
  {
    id: 'user-menu',
    attachTo: {
      element: '.top-menus .tour-user-menu',
      on: 'bottom'
    },
    beforeShowPromise: () => {
      return new Promise((resolve) => {
          resolve();
      });
    },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
    cancelIcon: {
      enabled: true
    },
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Vos utilisateurs',
    text: ['Crééz et gérez vos utilisateurs.'],
    when: {
      show: () => {
        console.log('show step');
      },
      hide: () => {
        console.log('hide step');
      }
    }
  },

  // show group menu
  {
    id: 'group-menu',
    attachTo: {
      element: '.top-menus .tour-group-menu',
      on: 'bottom'
    },
    beforeShowPromise: () => {
      return new Promise((resolve) => {
        resolve();
      });
    },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
    cancelIcon: {
      enabled: true
    },
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Vos groupes',
    text: ['Gérez ici les différents groupes d\'utilisateurs'],
    when: {
      show: () => {
        console.log('show step');
      },
      hide: () => {
        console.log('hide step');
      }
    }
  },


  // show audit menu
  {
    id: 'audit-menu',
    attachTo: {
      element: '.top-menus .tour-audit-menu',
      on: 'bottom'
    },
    beforeShowPromise: () => {
      return new Promise((resolve) => {
        resolve();
      });
    },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
    cancelIcon: {
      enabled: true
    },
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Tracabilité',
    text: ['Retrouvé tous les éléments de tracabilité liés à votre plateforme'],
    when: {
      show: () => {
        console.log('show step');
      },
      hide: () => {
        console.log('hide step');
      }
    }
  },

  // show org menu
  {
    id: 'org-menu',
    attachTo: {
      element: '.top-menus .tour-org-menu',
      on: 'bottom'
    },
    beforeShowPromise: () => {
      return new Promise((resolve) => {
        resolve();
      });
    },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back'
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next'
      }
    ],
    cancelIcon: {
      enabled: true
    },
    classes: 'custom-class-name-1 custom-class-name-2',
    highlightClass: 'highlight',
    scrollTo: false,
    title: 'Vos organisations',
    text: ['Une organisation est une isolation de vos ressources. Cela peu par exemple représenter une' +
    ' organisation physique de votre entreprise.'],
    when: {
      show: () => {
        console.log('show step');
      },
      hide: () => {
        console.log('hide step');
      }
    }
  },



];
