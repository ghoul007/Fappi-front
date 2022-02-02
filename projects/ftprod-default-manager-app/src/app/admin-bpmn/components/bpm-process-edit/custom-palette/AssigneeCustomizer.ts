import {PaletteCustomizer} from './PaletteCustomizer';
import {EntryFactory, OriginalCmdHelper} from '../bpmn-js';

export class AssigneeCustomizer extends PaletteCustomizer {

  constructor(translate, getBusinessObject, groupsComoboxItem, moddle) {
    super(translate, getBusinessObject, groupsComoboxItem, moddle);
  }

  customize(tabs, element) {
    if (element.businessObject.$type === 'bpmn:UserTask') {
      const tab = this.getCreateTab(tabs, 'assignee', 'Assignee');
      tab.groups.push({
        id: 'assignee',
        label: this.translate('Assignee'),
        entries: [
          EntryFactory.comboBox({
            id: 'assigneeGroup',
            label: this.translate('Group'),
            selectOptions: this.groupsComoboxItem,
            get: (e, node) => {
              const bo = this.getBusinessObject(e);
              if (
                bo.$attrs['activiti:candidateGroups']
              ) {
                return {
                  fappiGroupAssignee:
                    bo.$attrs['activiti:candidateGroups']
                };
              }
              return {fappiGroupAssignee: ''};
            },
            set: (e, values, node) => {
              const bo = this.getBusinessObject(e);
              const testname = values.fappiGroupAssignee;
              const props = {
                'activiti:candidateGroups': testname ? testname : ''
              };
              return OriginalCmdHelper.updateBusinessObject(e, bo, props);
            },
            modelProperty: 'fappiGroupAssignee',
            validate: (e, values) => {
              const validationResult: any = {};
              if (!values.assignee) {
                validationResult.assignee = 'Name must not be empty';
              }
            }
          })
        ]
      });
    }
    return tabs;
  }

}
