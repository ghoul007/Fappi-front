import {UpdateWatcher} from 'fappi-ng-cms';
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {FappiUtils, NodeSlug, OrgSiteNodeSlugDto, SiteService, TaskService, UserInfoService} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';
import {ContributionService} from '../../../../../common/service/ContributionService';
import {CommentResource} from '../../../../../common/model/resource/CommentResource';
import {CreateCommentDto} from '../../../../../common/model/dto/CreateCommentDto';
import {DeleteCommentDto} from '../../../../../common/model/dto/DeleteCommentDto';
import {debug} from 'ng-packagr/lib/utils/log';
import {EditCommentDialog} from "./edit-comment.dialog";
import {MatDialog} from "@angular/material/dialog";
import {StartWorkflowDialog} from "../../edit-chapter/start-workflow-popup/start-workflow.dialog";
import {UpdateCommentDto} from "../../../../../common/model/dto/UpdateCommentDto";


@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnChanges {

  @Input()
  orgId: string;

  @Input()
  chapterId: string;

  @Input()
  nodeSlug: string;

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  commentCount: EventEmitter<number> = new EventEmitter<number>();

  loading = false;

  comments: CommentResource[] = [];

  operations: Set<string> = new Set();

  currentLogin: string;

  constructor(private fb: FormBuilder, private siteService: SiteService, private uxMessageService: UXMessageService,
              private contributionService: ContributionService, protected updateWatcher: UpdateWatcher,
              protected userInfoService: UserInfoService, public dialog: MatDialog) {
    this.userInfoService.infos().subscribe((i) => this.currentLogin = i.name);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateWatcher.update.subscribe((m) => {
      const nodePublicId = '/private/' + this.orgId + '/' + this.chapterId + this.nodeSlug + '/meta/comment/';
      // check if we are in the good node:
      if (m.elementId.startsWith(nodePublicId)) {
        if (m.kind === 'CreateNodeEvent' || m.kind === 'UpdatedNodeContentEvent' || m.kind === 'DeleteNodeEvent') {
          setTimeout(() => this.loadComments(), 100);
          if (this.operations.has(m.contextId)) {
            this.operations.delete(m.contextId);
            this.loading = false;
          }
        }
      }
    });
    this.loadComments();
  }


  loadComments() {
    this.contributionService.findNodeComments(this.orgId, this.chapterId, this.nodeSlug).subscribe((comments) => {
      this.comments = comments;
      this.commentCount.emit(comments.length);
    });
  }

  onCancel(f: NgForm) {
    f.reset({content: ''});
  }

  onSubmitComment(f: NgForm) {
    if (f.valid) {
      this.loading = true;

      const createCommentDto = new CreateCommentDto();
      createCommentDto.content = f.value.content;
      createCommentDto.orgSiteNodeSlugDto = new OrgSiteNodeSlugDto();
      createCommentDto.orgSiteNodeSlugDto.organizationId = this.orgId;
      createCommentDto.orgSiteNodeSlugDto.elementId = this.chapterId;
      createCommentDto.orgSiteNodeSlugDto.nodeSlug = new NodeSlug(this.nodeSlug);
      createCommentDto.contextId = FappiUtils.uuid();
      this.contributionService.createComment(createCommentDto).subscribe((comment) => {
          this.operations.add(createCommentDto.contextId);
          this.loading = false;
          f.reset({content: ''});
          this.loadComments();
        },
        (err) => {
          alert(err);
          this.loading = false;
        }
      );
    }
  }

  delete(comment: CommentResource) {
    const deleteCommentDto = new DeleteCommentDto();
    deleteCommentDto.orgSiteNodeSlugDto = comment.orgSiteNodeSlugDto;
    deleteCommentDto.uuid = comment.uuid;
    deleteCommentDto.contextId = FappiUtils.uuid();
    this.contributionService.deleteComment(deleteCommentDto).subscribe((ok) => {
      this.loadComments();
      this.loading = false;
    });
  }

  edit(comment: CommentResource) {
    const dialogRef = this.dialog.open(EditCommentDialog, {
      width: '450px', data: {
        'comment': comment.content,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updateComment = new UpdateCommentDto();
          updateComment.orgSiteNodeSlugDto = comment.orgSiteNodeSlugDto;
          updateComment.uuid = comment.uuid;
          updateComment.contextId = FappiUtils.uuid();
          updateComment.content = result.comment;
          this.contributionService.updateComment(updateComment).subscribe((ok) => {
            this.loadComments();
            this.loading = false;
          });
        }
      }
    );
  }
}
