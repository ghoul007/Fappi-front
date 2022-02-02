import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-fhir-code',
  templateUrl: 'code.component.html',
  styleUrls: ['code.component.scss']
})
export class CodeComponent {

  internalValue: fhir.r4.Coding;

  label: string;
  tooltip: string;
  icon: { code?: string, nativeCode?: string };

  langToContry = {
    'fr-FR': 'FRA',
    'en-GB': 'GBR',
    'en-US': 'USA',
    'it-IT': 'ITA',
  };

  get value(): fhir.r4.Coding {
    return this.internalValue;
  }

  @Input()
  set value(value: fhir.r4.Coding) {
    if (value) {
      this.internalValue = value;
      if (value.display) {
        this.label = this.internalValue.display;
      } else {
        this.label = this.internalValue.code;
      }
      this.tooltip = 'System: ' + this.internalValue.system + ' code: ' + this.internalValue.code;
      this.resolveIcon();
    }
  }

  resolveIcon() {
    // language:
    if ('urn:ietf:bcp:47' === this.value.system) {
      this.icon = {code: 'country_' + this.langToContry[this.value.code]};
    } else if ('http://terminology.hl7.org/CodeSystem/observation-category' === this.value.system) {
      if (this.value.code === 'vital-signs') {
        this.icon = {nativeCode: 'analytics'};
      } else if (this.value.code === 'laboratory') {
        this.icon = {nativeCode: 'science'};
      } else if (this.value.code === 'survey') {
        this.icon = {nativeCode: 'fact_check'};
      }
    }

  }
}
