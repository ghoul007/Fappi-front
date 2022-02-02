import {PaletteCustomizer} from './PaletteCustomizer';
import {EntryFactory} from '../bpmn-js';

export class EmailPalette extends PaletteCustomizer {

  constructor(translate, getBusinessObject, groupsComoboxItem, moddle) {
    super(translate, getBusinessObject, groupsComoboxItem, moddle);
  }

  customize(tabs, element) {
    console.log(element.businessObject.$type);
    if (element.businessObject.$type === 'bpmn:SendTask') {
      const tab = this.getCreateTab(tabs, 'conditions', 'Conditions');
      tab.groups.push({
        id: 'email',
        label: this.translate('Email'),
        entries: [
          EntryFactory.textBox({
            id: 'from',
            label: this.translate('from'),
            set: (e, values, node) => {
              const bo = this.getBusinessObject(e);
              this.writeExtenssion(bo, values, 'from');
              return;
            },
            get: (e, node) => {
              const mailConfig = this.readExtenssion(this.getBusinessObject(e));
              return mailConfig;
            },
            modelProperty: 'from'
          }),
          EntryFactory.textBox({
            id: 'to',
            label: this.translate('to'),
            set: (e, values, node) => {
              const bo = this.getBusinessObject(e);
              this.writeExtenssion(bo, values, 'to');
              return;
            },
            get: (e, node) => {
              const mailConfig = this.readExtenssion(this.getBusinessObject(e));
              return mailConfig;
            },
            modelProperty: 'to'
          }),
          EntryFactory.textBox({
            id: 'subject',
            label: this.translate('subject'),
            set: (e, values, node) => {
              const bo = this.getBusinessObject(e);
              this.writeExtenssion(bo, values, 'subject');
              return;
            },
            get: (e, node) => {
              const mailConfig = this.readExtenssion(this.getBusinessObject(e));
              return mailConfig;
            },
            modelProperty: 'subject'
          }),
          EntryFactory.textBox({
            id: 'html',
            label: this.translate('Html'),
            set: (e, values, node) => {
              const bo = this.getBusinessObject(e);
              this.writeExtenssion(bo, values, 'html');
              return;
            },
            get: (e, node) => {
              const mailConfig = this.readExtenssion(this.getBusinessObject(e));
              return mailConfig;
            },
            modelProperty: 'html'
          }),

        ]
      });
    }
  }


  readExtenssion(businessObject): MailConfig {
    const mc = new MailConfig();
    if (businessObject.get('bpmn:extensionElements')) {
      for (const elem of businessObject.get('bpmn:extensionElements').get('values')) {
        if (elem.get('name')) {
          mc[elem.get('name')] = elem.get('activiti:expression');
        }
      }
    }
    return mc;
  }

  writeExtenssion(businessObject, mailConfig: MailConfig, patchField: string): void {
    businessObject.set('activiti:type', 'mail');
    const from = this.moddle.create('activiti:Field', {name: 'from', 'activiti:expression': mailConfig.from});
    const to = this.moddle.create('activiti:Field', {name: 'to', 'activiti:expression': mailConfig.to});
    const subject = this.moddle.create('activiti:Field', {name: 'subject', 'activiti:expression': mailConfig.subject});
    const html = this.moddle.create('activiti:Field', {name: 'html', 'activiti:expression': mailConfig.html});
    if (!businessObject.get('bpmn:extensionElements')) {
      const val = this.moddle.create('bpmn:ExtensionElements');
      val.get('values').push(from);
      val.get('values').push(to);
      val.get('values').push(subject);
      val.get('values').push(html);
      businessObject.set('bpmn:extensionElements', val);
    } else {
      for (const val of businessObject.get('bpmn:extensionElements').get('values')) {
        if (val.get('name') === patchField) {
          val.set('activiti:expression', mailConfig[patchField]);
        }
      }
    }
  }
}

class MailConfig {
  constructor(public to?: string, public from?: string, public subject?: string, public html?: string) {
  }
}


/*
<bpmn:extensionElements>
<activiti:field name="from">
  <activiti:expression>guillaume@ftprod.fr</activiti:expression>
</activiti:field>
<activiti:field name="to">
  <activiti:expression>guillaume@ftprod.fr</activiti:expression>
</activiti:field>
<activiti:field name="subject">
  <activiti:expression>ASN2019 - ${chapter} - Avis de modification</activiti:expression>
</activiti:field>
<activiti:field name="html">
  <activiti:expression>
Avis de modification. Chapitre : ${chapter}
</activiti:expression>
</activiti:field>
</bpmn:extensionElements>

 */
