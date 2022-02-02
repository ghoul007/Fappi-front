import {AfterViewInit, Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {
  AddSubscriptionDto,
  CancelSubscriptionDto,
  ClientSlug,
  ConfirmDeleteSubscriptionDto,
  ConfirmSubscriptionDto,
  DeleteSubscriptionDto,
  SubscriptionId,
  SubscriptionResource,
  SuperAdminService
} from 'fappi-common-model';
import {UXMessageService} from 'fappi-ng-material-kit';


@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.scss']
})
export class ModuleEditComponent implements AfterViewInit {


  @Input()
  clientId: string;
  addSubscriptionForm: FormGroup;
  rendered: boolean;

  dataSource = new MatTableDataSource<SubscriptionResource>([]);
  displayedColumns: string[] = ['id', 'startDate', 'endDate', 'status', 'actions'];


  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private uxMessageService: UXMessageService,
              private superAdminService: SuperAdminService) {
  }

  ngAfterViewInit(): void {
    this.initTable();
    this.initForm();

  }

  initTable() {
    this.superAdminService.findAllSubscriptions(this.clientId).subscribe((clients) => {
        this.dataSource.data = clients.content;
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  initForm() {
    this.addSubscriptionForm = this.fb.group({
      subscriptionId: ['', Validators.required],
      autoRenew: ['', Validators.required],
      startDate: ['', Validators.required],
      period: ['', Validators.required],
    });
    this.rendered = true;
  }

  onSubmitForm() {
    const formValue = this.addSubscriptionForm.value;
    const subscriptionDto = new AddSubscriptionDto();
    subscriptionDto.subscriptionId = new SubscriptionId(this.clientId, formValue.subscriptionId);
    subscriptionDto.autoRenew = formValue.autoRenew;
    subscriptionDto.startDate = formValue.startDate;
    subscriptionDto.endDate = null;
    subscriptionDto.period = formValue.period;
    subscriptionDto.clientSlug = new ClientSlug(this.clientId);
    this.superAdminService.addSubscription(subscriptionDto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Subscription added');
        setTimeout(() => {
          this.initTable();
        }, 1000);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  back() {
    window.history.back();
  }


  activate(id: SubscriptionId) {
    const dto = new ConfirmSubscriptionDto();
    dto.clientSlug = new ClientSlug(this.clientId);
    dto.subscriptionId = id;

    this.superAdminService.activateSubscription(dto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Subscription activated');
        setTimeout(() => {
          this.initTable();
        }, 500);
      },
      (err) => this.uxMessageService.handleError(err));
  }

  cancel(id: SubscriptionId) {
    const dto = new CancelSubscriptionDto();
    dto.clientSlug = new ClientSlug(this.clientId);
    dto.subscriptionId = id;

    this.superAdminService.cancelSubscription(dto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Subscription canceled');
        setTimeout(() => {
          this.initTable();
        }, 500);
      },
      (err) => this.uxMessageService.handleError(err));
  }

  delete(id: SubscriptionId) {
    const dto = new DeleteSubscriptionDto();
    dto.clientSlug = new ClientSlug(this.clientId);
    dto.subscriptionId = id;

    this.superAdminService.deleteSubscription(dto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Subscription deleted');
        setTimeout(() => {
          this.initTable();
        }, 500);
      },
      (err) => this.uxMessageService.handleError(err));
  }

  forceDelete(id: SubscriptionId) {
    const dto = new ConfirmDeleteSubscriptionDto();
    dto.clientSlug = new ClientSlug(this.clientId);
    dto.subscriptionId = id;

    this.superAdminService.forceDeleteSubscription(dto).subscribe((ret) => {
        this.uxMessageService.handleSuccess('Subscription deleted');
        setTimeout(() => {
          this.initTable();
        }, 500);
      },
      (err) => this.uxMessageService.handleError(err));
  }

}
