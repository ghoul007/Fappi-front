export class PaletteCustomizer {


  constructor(protected translate, protected getBusinessObject, protected groupsComoboxItem, protected moddle) {
  }


  customize(tabs, element): any {
  }

  /**
   * Find an existing tab
   * @param tabs where to find
   * @param id to find
   * @param label (if creation)
   */
  getCreateTab(tabs, id: string, label: string) {
    for (const tab of tabs) {
      if (tab.id === id) {
        return tab;
      }
    }
    // no one found, create it
    const newTab = {
      'id': id,
      'label': this.translate(label),
      groups: []
    };

    tabs.push(newTab);
    return newTab;
  }
}
