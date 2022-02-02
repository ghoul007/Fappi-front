import {InjectionNames, Modeler, OriginalPropertiesProvider, PropertiesPanelModule} from './bpmn-js';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomPropsProvider} from './CustomPropsProvider';
import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import activitiModdle from './moddle/activiti-simple.json';

import {GroupService, ProcessService} from 'fappi-common-model';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-bpm-modeler',
  templateUrl: './bpm-modeler.component.html',
  styleUrls: ['./bpm-modeler.component.scss']
})
export class BpmModelerComponent implements OnInit {

  @Output() public importDone: EventEmitter<any> = new EventEmitter();
  modeler;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  @Input() private orgId: string;
  @Input() private id: string;

  @Output()
  private saveClick: EventEmitter<string> = new EventEmitter<string>();

  private pcanvalElement: ElementRef;

  constructor(private http: HttpClient, private processService: ProcessService, private groupService: GroupService) {
  }

  get canvalElement(): ElementRef {
    return this.pcanvalElement;
  }

  @ViewChild('canvalElement', {read: ElementRef})
  set canvalElement(el: ElementRef) {
    if (el) {
      el.nativeElement.id = this.createUUID();
      this.pcanvalElement = el;
      this.initModeler();
    }
  }

  ngOnInit(): void {
  }


  initModeler() {
    this.groupService.findAllByOrganization(this.orgId).subscribe((groups) => {

      this.modeler = new Modeler({
        container: '#' + this.canvalElement.nativeElement.id,
        width: '100%',
        height: '600px',
        additionalModules: [
          PropertiesPanelModule,
          //      camundaModdleExtension,
          // Re-use original bpmn-properties-module, see CustomPropsProvider
          {[InjectionNames.bpmnPropertiesProvider]: ['type', OriginalPropertiesProvider.propertiesProvider[1]]},
          {[InjectionNames.propertiesProvider]: ['type', CustomPropsProvider]},
          {['fappiAvailableGroups']: ['factory', () => groups]},
          {['fappiOrganization']: ['factory', () => this.orgId]},
          // Re-use original palette, see CustomPaletteProvider
          // {[InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider]},
          // {[InjectionNames.paletteProvider]: ['type', CustomPaletteProvider]},
        ],
        propertiesPanel: {
          parent: '#properties'
        },
        moddleExtensions: {
          activiti: activitiModdle,
//          camunda: camundaModdle,
        }
      });

      // then load xml
      this.load();
    });


  }


  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }


  load() {
    this.processService.loadBpmFile(this.orgId, this.id).subscribe(
      (xml: any) => {
        this.modeler.importXML(xml, this.handleError);
      },
      this.handleError
    );
  }


  save(): void {
    this.modeler.saveXML((err: any, xml: any) => {
      if (err) {
        console.log(err);
      }
      this.saveClick.emit(xml);
    });
  }


  createUUID() {
    return 'a' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  }
}
