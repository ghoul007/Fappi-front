import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CrmCustomFieldsService} from '../../../domain/services/CrmCustomFieldsService';
import {UXMessageService} from 'fappi-ng-material-kit';
import {AddCustomTypeDto, NodeTypeIdentifierDto} from 'fappi-common-model';

@Component({
  templateUrl: './contact-fields.component.html',
  styleUrls: ['./contact-fields.component.scss']
})
export class ContactFieldsComponent {

  orgId: string;
  nodeTypeSlug: string = 'contact';
  //only one custom type for contacts
  attachedElementId = 'default_type';

  notInitialized = false;
  error = false;

  constructor(private route: ActivatedRoute, public crmCustomFieldsService: CrmCustomFieldsService, private uxMessageService: UXMessageService) {
    this.orgId = this.route.parent.parent.parent.parent.parent.snapshot.params.orgId;
  }

  onSaved() {
    console.log('ok');
  }

  onError(e) {
    if (e === 'Node type not found') {
      this.notInitialized = true;
    } else {
      this.error = true;
    }
  }

  createDefault() {
    const addNodeTypeDto = new AddCustomTypeDto();
    let id: NodeTypeIdentifierDto = new NodeTypeIdentifierDto();
    id.id.elementId = 'default_type';
    id.id.organizationId = this.orgId;
    id.slug = 'contact';
    addNodeTypeDto.id = id;
    addNodeTypeDto.name = 'contact';
    this.crmCustomFieldsService.addNodeType(addNodeTypeDto).subscribe((e) => {
        (err) => this.uxMessageService.handleSuccess('Created');
        setTimeout(function() {
          window.location = window.location;
        }, 500);
      },
      (e) => {
        this.uxMessageService.handleError(e);
      }
    );

  }
}
