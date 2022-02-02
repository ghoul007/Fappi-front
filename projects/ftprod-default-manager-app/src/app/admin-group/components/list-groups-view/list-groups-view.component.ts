import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupResource} from 'fappi-common-model';

@Component({
  selector: 'app-group-users-view',
  templateUrl: './list-groups-view.component.html',
  styleUrls: ['./list-groups-view.component.scss']
})
export class ListGroupsViewComponent {

  orgId: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.parent.parent.params.subscribe(params => {
      this.orgId = params.orgId;
    });
  }


  onGroupSelected(event: GroupResource) {
    this.router.navigate(['org', this.orgId, 'admin', 'groups', 'edit', event.groupId.id]);
  }
}
