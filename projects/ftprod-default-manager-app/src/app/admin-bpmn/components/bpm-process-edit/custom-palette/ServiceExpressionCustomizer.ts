import {PaletteCustomizer} from './PaletteCustomizer';
import {EntryFactory, OriginalCmdHelper} from '../bpmn-js';

export class ServiceExpressionCustomizer extends PaletteCustomizer {

  constructor(translate, getBusinessObject, groupsComoboxItem, moddle) {
    super(translate, getBusinessObject, groupsComoboxItem, moddle);
  }

  customize(tabs, element) {
    if (element.businessObject.$type === 'bpmn:ServiceTask') {
      const tab = this.getCreateTab(tabs, 'action', 'Actions');
      tab.groups.push({
        id: 'webhook',
        label: this.translate('Web Hook'),
        entries: [
          EntryFactory.textField({
            id: 'webhook',
            description: 'Call a web url. An expression like: #{webHook.post(execution, \'https://myurl/args\')}',
            label: this.translate('Expression'),
            get: (e, node) => {
              const bo = this.getBusinessObject(e);
              if (
                bo.$attrs['activiti:expression']
              ) {
                return {
                  webhookexpression:
                    bo.$attrs['activiti:expression']
                };
              }
              return {webhookexpression: ''};
            },
            set: (e, values, node) => {
              const bo = this.getBusinessObject(e);
              const props = {'activiti:expression': values.webhookexpression ? values.webhookexpression : ''};
              return OriginalCmdHelper.updateBusinessObject(e, bo, props);
            },
            modelProperty: 'webhookexpression',
            validate: (e, values) => {
              const validationResult: any = {};
              // ok
            }
          })

        ]
      });
    }
  }
}
