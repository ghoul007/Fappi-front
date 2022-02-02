import {CmsEditNodeTypesComponent, UpdateWatcher} from 'fappi-ng-cms';
import {Component, Input} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NodeResource, SiteService, UserInfoService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {ContributionService} from '../../../../common/service/ContributionService';
import {AddContributionDto} from '../../../../common/model/dto/AddContributionDto';



@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.scss'],
  providers: []
})
export class EditNodeComponent extends CmsEditNodeTypesComponent {

  editedBy: string;
  lastEditTime: Date;
  currentlyEditing: boolean;
  currentlyEditingWarn: boolean;
  currentlyEditingWarnTime: string;
  currentlyEditingWarnPerson: string;
  editWithWarning = false;
  commentCount = 0;
  hotContent: boolean;
  oldHotContent: boolean;
  operations: Set<string> = new Set();
  contributionService: ContributionService;


  constructor(fb: FormBuilder, siteService: SiteService, uxMessageService: UXMessageService,
              dialog: MatDialog, nodeWatcher: UpdateWatcher, userInfoService: UserInfoService, contributionService: ContributionService) {
    super(fb, siteService, uxMessageService, dialog, nodeWatcher, userInfoService);
    this.contributionService = contributionService;

    userInfoService.infos().subscribe(infos => {
      this.nodeEditStart.subscribe((e) => {
        this.currentlyEditing = true;

        if (this.selectedNode.meta) {
          let minTime = 10000000;
          for (const prop in this.selectedNode.meta) {
            if ((prop as string).startsWith('editing_by_') && prop !== 'editing_by_' + infos.name) {
              const editorName = (prop as string).replace('editing_by_', '');
              const deltaSecond = (new Date().getTime() - (this.selectedNode.meta['editing_on_' + editorName] * 1)) / 1000;
              if (deltaSecond < 10 * 60) {
                this.currentlyEditingWarn = true;
                if (minTime > deltaSecond) {
                  minTime = deltaSecond;
                  this.currentlyEditingWarnPerson = editorName;
                }
              }
            }
          }
          this.currentlyEditingWarnTime = '' + Math.round(minTime);
        }
      });

      this.nodeEditEnd.subscribe((e) => {
        this.currentlyEditing = false;
        this.currentlyEditingWarn = false;

      });
    });
  }

  get selectedNode(): NodeResource {
    return super.selectedNode;
  }

  @Input()
  set selectedNode(node: NodeResource) {
    super._selectedNode = node;
    if (node) {
      this.editNode();
      this.hotContent = super.selectedNode.meta && 'true' === super.selectedNode.meta.hotContent;
      this.oldHotContent = this.hotContent;
    }
  }

  saveNode() {
    this.editNodeForm.patchValue({
      _$$name: this.searchNodeNameFromContent(this.editNodeForm.value._$$name)
    });
    super.saveNode();

    // save the meta if admin:
    if (this.oldHotContent !== this.hotContent) {
      this.oldHotContent = this.hotContent;
      const meta: any = {};
      meta.hotContent = '' + this.hotContent;
      this.siteService.updateNodeMeta(this.selectedNode.id.organizationId, this.selectedNode.id.elementId,
        this.selectedNode.id.nodeSlug.slug, meta, true)
        .subscribe((o) => {
          this.operations.add(o.contextId);
        });
    }

    const addContrib = new AddContributionDto();
    addContrib.chapterTitle = this.selectedNode.id.elementId;
    addContrib.tasks = 'édition de contenu';
    this.contributionService.addContribution(this.selectedNode.id.organizationId, this.selectedNode.id.elementId, addContrib).subscribe((a) => {
    });
  }

  // the first time we try to guess the name of the node:
  searchNodeNameFromContent(oldVal: string): string {
    if (oldVal === '' || !oldVal) {
      if (this.editNodeForm.value) {
        for (const property in this.editNodeForm.value) {
          if (property !== '_$$name') {
            if (this.editNodeForm.value[property] && this.editNodeForm.value[property].length > 1) {
              const cleanText = this.stripHtml(this.editNodeForm.value[property] as string);
              return cleanText.substring(0, Math.min(20, cleanText.length));
            }
          }
        }
      }
    }
    return oldVal;
  }

  stripHtml(html) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  savedMetaCommit(contextId: string) {
    /*  super.savedMetaCommit(contextId);
      setTimeout(() => this.refresh(), 100);
      if (this.operations.has(contextId)) {
        this.operations.delete(contextId);
      }*/
  }

  startEditTitle() {
    super.startEditTitle();
    console.log(this);
  }
}
