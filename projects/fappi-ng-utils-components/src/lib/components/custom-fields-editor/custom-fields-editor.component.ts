import {AfterViewInit, Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidatorService} from '../angular4-material-table/validator.service';
import {TableDataSource} from '../angular4-material-table/table-data-source';
import {CustomFieldService, CustomTypeField, NodeTypeIdentifierDto, UpdateCustomTypeDto} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


@Injectable()
export class PersonValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      slug: new FormControl(null, Validators.required),
      label: new FormControl(),
      type: new FormControl(null, Validators.required),
      possibleValues: new FormControl(),
      helper: new FormControl(),
      order: new FormControl()
    });
  }
}

@Component({
  selector: 'app-custom-fields-editor',
  templateUrl: './custom-fields-editor.component.html',
  styleUrls: ['./custom-fields-editor.component.scss'],
  providers: [
    {provide: ValidatorService, useClass: PersonValidatorService}
  ],
})
export class CustomFieldsEditorComponent implements OnInit {

  static NODE_TYPE_DONT_EXIST = 'Node type dont exist';


  createNodeTypeForm: FormGroup;
  // other columns: 'possibleValues','helper',*/
  displayedColumns = ['label', 'slug', 'type', 'order', 'actionsColumn'];
  nodeTypeFieldList: CustomTypeField[];
  visibilityTypes = ['PUBLIC', 'PRIVATE'];
  dataSource: TableDataSource<CustomTypeField>;
  rendered = false;
  @Input()
  orgId: string;
  @Input()
  attachedElementId: string;
  @Input()
  nodeTypeSlug: string;
  @Input()
  customFieldService: CustomFieldService;
  @Input()
  showName = true;
  @Input()
  showVisibility = true;

  @Output()
  onSaved: EventEmitter<void> = new EventEmitter();
  @Output()
  onError: EventEmitter<string> = new EventEmitter();

  defaultDefinition: string;
  fieldTypes: any[] = [
    {value: 'STRING', label: 'Text'},
    {value: 'TEXT', label: 'Long text'},
    {value: 'BOOLEAN', label: 'Yes/No'},
    {value: 'DATE', label: 'Date'},
    {value: 'ENUM', label: 'List of'},
    {value: 'NUMBER', label: 'Number'},
    {value: 'FILE', label: 'File'},
    {value: 'MEDIA', label: 'Media'}
  ];

  controlsIndex = 0;

  processing = false;

  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private uxMessageService: UXMessageService,
              private personValidator: ValidatorService) {
  }


  ngOnInit(): void {

    const nodeTypeId = new NodeTypeIdentifierDto();
    nodeTypeId.slug = this.nodeTypeSlug;
    nodeTypeId.id.elementId = this.attachedElementId;
    nodeTypeId.id.organizationId = this.orgId;
    this.loadNodeTypes(nodeTypeId);
  }


  loadNodeTypes(nodeTypeId: NodeTypeIdentifierDto) {
    this.loading = true;
    this.customFieldService.findOneNodeType(this.orgId, nodeTypeId).subscribe((nt) => {
      // when the node is not ready, it is probably not created. We retry to load it
      if ( !nt ) {
        setTimeout(() => {
          this.loadNodeTypes(nodeTypeId);
        }, 1000);
        return;
      }
      nt.customTypeFields = nt.customTypeFields.sort((nt1, nt2) => nt1.order - nt2.order);
      this.createNodeTypeForm = this.fb.group({
        name: ['', Validators.required],
        visibility: ['', Validators.required]
      });

      this.createNodeTypeForm.patchValue({name: nt.name, visibility: nt.visibility});


      this.nodeTypeFieldList = nt.customTypeFields;
      this.dataSource = new TableDataSource<any>(this.nodeTypeFieldList, CustomTypeField, this.personValidator);
      this.dataSource.datasourceSubject.subscribe(nodeTypeFieldList => {
      });


      this.rendered = true;
      this.loading = false;
    }, (e) => {
      this.loading = false;
      if (e.error && e.error.message === 'Node type not found') {
        this.onError.emit(e.error.message);
      } else {
        this.onError.emit('unknow error');
      }
    });
  }


  onSubmitForm() {
    this.processing = true;
    const formValue = this.createNodeTypeForm.value;
    const nodeTypeDto = new UpdateCustomTypeDto();
    const id: NodeTypeIdentifierDto = new NodeTypeIdentifierDto();
    id.id.elementId = this.attachedElementId;
    id.id.organizationId = this.orgId;
    id.slug = this.nodeTypeSlug;
    nodeTypeDto.id = id;
    nodeTypeDto.name = formValue.name;
    nodeTypeDto.visibility = formValue.visibility;

    const rows = [];
    let i = 0;
    while (true) {
      const row = this.dataSource.getRow(i++);
      if (!row) {
        break;
      }
      rows.push(row.currentData);
    }

    nodeTypeDto.customTypeFields = rows;
    this.customFieldService.updateNodeType(nodeTypeDto).subscribe((ret) => {
        this.processing = false;
        this.uxMessageService.handleSuccess('Node type updated');
        this.onSaved.emit(ret);
      },
      (err) => {
        this.processing = false;
        this.uxMessageService.handleError(err);
      }
    );
  }

  back() {
    window.history.back();
  }

  addNodeTypeField() {
    this.dataSource.createNew();
  }


}

