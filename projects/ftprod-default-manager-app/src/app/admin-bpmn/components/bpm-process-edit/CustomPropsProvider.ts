import {IPropertiesProvider} from './bpmn-js';
import {GroupResource} from 'fappi-common-model';
import {PaletteCustomizer} from './custom-palette/PaletteCustomizer';
import {AssigneeCustomizer} from './custom-palette/AssigneeCustomizer';
import {SequenceFlowExpression} from './custom-palette/SequenceFlowExpression';
import {ServiceExpressionCustomizer} from './custom-palette/ServiceExpressionCustomizer';
import {EmailPalette} from './custom-palette/EmailPalette';
import {UserFormOutcomeCustomizer} from './custom-palette/UserFormOutcomeCustomizer';

export class CustomPropsProvider implements IPropertiesProvider {
  static $inject = ['translate', 'bpmnPropertiesProvider', 'fappiAvailableGroups', 'fappiOrganization', 'moddle'];

  private groupsComoboxItem: any[] = [];
  private availableForms: any[] = [];
  private paletteCustomizers: PaletteCustomizer[] = [];

  constructor(private translate, private bpmnPropertiesProvider,
              private fappiAvailableGroups: GroupResource[], private fappiOrganization: string, private moddle) {
    this.groupsComoboxItem = [];
    for (const g of fappiAvailableGroups) {
      this.groupsComoboxItem.push({name: g.name, value: '/' + g.groupId.organizationId + '/' + g.groupId.id});
    }
    this.availableForms.push({name: 'Simple validation with comment', value: 'simple-validate'});

    this.paletteCustomizers.push(new AssigneeCustomizer(translate, this.getBusinessObject, this.groupsComoboxItem, this.moddle));
    this.paletteCustomizers.push(new SequenceFlowExpression(translate, this.getBusinessObject, this.groupsComoboxItem, this.moddle));
    this.paletteCustomizers.push(new ServiceExpressionCustomizer(translate, this.getBusinessObject, this.groupsComoboxItem, this.moddle));
    this.paletteCustomizers.push(new EmailPalette(translate, this.getBusinessObject, this.groupsComoboxItem, this.moddle));
    this.paletteCustomizers.push(new UserFormOutcomeCustomizer(translate, this.getBusinessObject, this.groupsComoboxItem, this.moddle));
  }

  getTabs(element) {
    const tabs = this.bpmnPropertiesProvider.getTabs(element);
    for (const paletteCustomizer of this.paletteCustomizers) {
      paletteCustomizer.customize(tabs, element);
    }

    return tabs;
  }

  getBusinessObject(element) {
    return (element && element.businessObject) || element;
  }
}
