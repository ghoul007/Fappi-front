import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ChannelResource,
  CustomTypeResource, FappiUtils,
  NodeResource,
  NodeVersionResource,
  SiteService,
  TaskService,
  UpdateSiteDto
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {ContributionService} from '../../../../common/service/ContributionService';
import {ContributionDto} from '../../../../common/model/dto/ContributionDto';
import {StartProcessInstancePayloadDto} from '../../../../../../../fappi-common-model/src/lib/domain/task/StartProcessInstancePayloadDto';
import {StartWorkflowDialog} from './start-workflow-popup/start-workflow.dialog';
import {MatDialog} from '@angular/material/dialog';
import {Task} from '../../../../../../../fappi-common-model/src/lib/domain/task/Task';
import {CmsEditNodeTypesComponent, CmsTreeComponent} from 'fappi-ng-cms';

@Component({
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.scss'],
})
export class EditChapterComponent {

  siteForm: FormGroup;

  // the site id
  slug: string;
  name: string;
  orgId: string;

  selectedNode: NodeResource;
  public currentTasks: Task[];

  toolbarModel = {selectedChannel: ChannelResource, selectedVersion: NodeVersionResource};

  channels: ChannelResource[] = [];
  versions: NodeVersionResource[] = [];

  @ViewChild('tree')  tree: CmsTreeComponent;
  @ViewChild('selectedNodeComponent')  selectedNodeComponent: CmsEditNodeTypesComponent;

  filterFunction = (n: any) => {
    if (n.id) {
      return '/private' !== n?.id?.nodeSlug?.slug ;
    } else {
      return '/private' !== n ;
    }
  }

  constructor(private fb: FormBuilder, private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, private contributionService: ContributionService,
              private taskService: TaskService, public dialog: MatDialog) {
    this.initForm();
    this.initData();
    this.initBpm();
  }

  initData() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      this.orgId = this.route.parent.parent.snapshot.params.orgId;
      this.siteService.findOne(this.route.parent.parent.snapshot.params.orgId, this.slug).subscribe(site => {
          this.slug = site.id.elementId;
          this.name = site.name;
          this.siteForm.patchValue(site);

          this.siteService.findOneNode(this.orgId, this.slug, '/').subscribe((nodeRoot) => {
            this.selectedNode = nodeRoot;
          });

          // pool status:
          this.contributionService.getStatus(this.orgId, this.slug).subscribe((status) => {
            console.log(status);
          });

        },
        (err) => this.uxMessageService.handleError(err)
      );

      this.siteService.findChannels(this.orgId, this.slug).subscribe((channels) => {
          this.channels = channels;
        },
        (err) => this.uxMessageService.handleError(err)
      );

      this.siteService.findVersions(this.orgId, this.slug).subscribe((versions) => {
          this.versions = versions;
        },
        (err) => this.uxMessageService.handleError(err)
      );
    });
  }

  initForm() {
    this.siteForm = this.fb.group({});
  }


  initBpm() {
    this.taskService.findAll(this.orgId).subscribe((tasks) => {
      this.currentTasks = [];
      for (const task of tasks) {
        if (task.variables.briefReport && task.variables.orgId === this.orgId && task.variables?.chapterId === this.slug) {
          this.currentTasks.push(task);
        }
      }
    });
  }

  onSubmitForm() {
    const formValue = this.siteForm.value;
    const site = new UpdateSiteDto();
    site.id.organizationId = this.orgId;
    site.id.elementId = this.slug;
    this.siteService.updateSite(site).subscribe((ret) => {
        this.router.navigate(['/sites']);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }


  onNodeSelected(node: NodeResource) {
    this.selectedNode = node;
  }

  onNodeTypeSelected(nodeTypeResource: CustomTypeResource) {
    this.router.navigate(['org', this.orgId, 'cms', 'sites', 'edit', this.slug,
      'node-type', 'edit', nodeTypeResource.id.id.elementId, nodeTypeResource.id.slug]);
  }

  onNodeEditStart(node: NodeResource) {
    const contributionDto = new ContributionDto();
    contributionDto.node = node.id;
    this.contributionService.markEdit(node.id.organizationId, node.id.elementId, contributionDto).subscribe((e) => {
      console.log('done');
    });
    // console.log('editing'+node.id.nodeSlug.slug);
  }

  onNodeEditEnd(node: NodeResource) {
    const contributionDto = new ContributionDto();
    contributionDto.node = node.id;
    this.contributionService.endEdit(node.id.organizationId, node.id.elementId, contributionDto).subscribe((e) => {
      console.log('done');
    });
  }

  back() {
    window.history.back();
  }

  startWorkflow(task: Task) {
    const dialogRef = this.dialog.open(StartWorkflowDialog, {
      width: '450px', data: {
        taskName: task.name,
        outcomeActions: task.outcomeActions
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const startProcessInstancePayloadDto = new StartProcessInstancePayloadDto();
        startProcessInstancePayloadDto.name = this.name;
        startProcessInstancePayloadDto.variables = {
          description: result.description,
          outcomeAction: result.outcomeAction
        };
        this.taskService.complete(this.orgId, task.id, startProcessInstancePayloadDto)
          .subscribe((users) => {
              this.uxMessageService.handleSuccess('Message  envoyé');
            },
            (err) => this.uxMessageService.handleError(err));
      }
    });
  }


 /*
  initWorkflow() {
    const dialogRef = this.dialog.open(StartWorkflowDialog, {
      width: '450px', data: {
        taskName: 'Demander une vérification',
        outcomeActions: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const startProcessInstancePayloadDto = new StartProcessInstancePayloadDto();
        startProcessInstancePayloadDto.name = this.name;
        startProcessInstancePayloadDto.variables = {
          briefReport: true,
          orgId: this.orgId,
          chapterId: this.slug
        };
        this.taskService.start(this.orgId, 'asn-review-process', startProcessInstancePayloadDto).subscribe((r) => {
          console.log(r);
        });
      }
    });
  }*/

  /**
   * Generate a random slug instead of the default to allow multiple nodes with same name
   * @param slug
   */
  generateSlug(slug: string): string {
      return FappiUtils.uuid().toLowerCase();
  }

  refresh() {
    this.selectedNodeComponent.refresh();
    this.tree.refresh();
  }

}
