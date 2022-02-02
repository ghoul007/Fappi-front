import {PaletteCustomizer} from './PaletteCustomizer';
import {EntryFactory, OriginalCmdHelper} from '../bpmn-js';

export class UserFormOutcomeCustomizer extends PaletteCustomizer {

  constructor(translate, getBusinessObject, groupsComoboxItem, moddle) {
    super(translate, getBusinessObject, groupsComoboxItem, moddle);
  }

  customize(tabs, element) {
    if (element.businessObject.$type === 'bpmn:UserTask') {
      const tab = this.getCreateTab(tabs, 'form', 'Form');
      tab.groups.push({
        id: 'fappiFormOutcomeActions',
        label: this.translate('Outcome actions'),
        entries: [
          EntryFactory.textField({
            id: 'outcomeActions',
            label: this.translate('Actions'),
            description: 'List of action of the form. Separate options with "\',\'". ' +
              'A variable "outcome" will be set in the process with this value.',
            selectOptions: this.groupsComoboxItem,
            get: (e, node) => {
              const bo = this.getBusinessObject(e);
              if (
                bo.$attrs['fappi:outcomeActions']
              ) {
                return {
                  outcomeActions:
                    bo.$attrs['fappi:outcomeActions']
                };
              }
              return {outcomeActions: ''};
            },
            set: (e, values, node) => {
              const bo = this.getBusinessObject(e);
              const testname = values.outcomeActions;
              const props = {
                'fappi:outcomeActions': testname ? testname : ''
              };
              return OriginalCmdHelper.updateBusinessObject(e, bo, props);
            },
            modelProperty: 'outcomeActions',
            validate: (e, values) => {
              const validationResult: any = {};
              // valid
            }
          })
        ]
      });
    }
    return tabs;
  }

}
