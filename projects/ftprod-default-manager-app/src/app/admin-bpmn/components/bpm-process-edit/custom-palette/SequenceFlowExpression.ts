import {PaletteCustomizer} from './PaletteCustomizer';
import {EntryFactory, OriginalCmdHelper} from '../bpmn-js';

export class SequenceFlowExpression extends PaletteCustomizer {

  constructor(translate, getBusinessObject, groupsComoboxItem, moddle) {
    super(translate, getBusinessObject, groupsComoboxItem, moddle);
  }

  customize(tabs, element) {
    if (element.businessObject.$type === 'bpmn:SequenceFlow') {
      const tab = this.getCreateTab(tabs, 'conditions', 'Conditions');
      tab.groups.push({
        id: 'condition',
        label: this.translate('condition'),
        entries: [
          EntryFactory.textBox({
            id: 'expression',
            label: this.translate('expression'),
            set: (e, values, node) => {
              const bo = this.getBusinessObject(e);
              bo.conditionExpression.body = values.fappiConditionExpression;
              const props = {};
              return OriginalCmdHelper.updateBusinessObject(e, bo, props);
            },
            get: (e, node) => {
              const bo = this.getBusinessObject(e);
              if (!bo.conditionExpression) {
                bo.conditionExpression = this.moddle.create('bpmn:FormalExpression', {body: ''});
              }
              if (bo.conditionExpression.body) {
                return {fappiConditionExpression: bo.conditionExpression.body};
              }
              return {fappiConditionExpression: ''};
            },
            modelProperty: 'fappiConditionExpression'
          }),

        ]
      });
    }
  }
}
