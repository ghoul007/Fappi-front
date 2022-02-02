import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SiteResource, SiteService} from 'fappi-common-model';
import {ActivatedRoute, Router} from '@angular/router';
import {UXMessageService} from 'fappi-ng-material-kit';
import {ContributionService} from '../../../../common/service/ContributionService';
import {ContributionResource} from '../../../../common/model/dto/ContributionResource';

@Component({
  templateUrl: 'list-contributions.component.html',
  styleUrls: ['list-contributions.component.scss']
})
export class ListContributionsComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  orgId: string;
  dataSource = new MatTableDataSource<ContributionResource>([]);
  displayedColumns: string[] = ['name', 'tasks', 'lastModified'];

  constructor(private siteService: SiteService, private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService, private contributionService: ContributionService) {
    this.orgId = this.route.parent.parent.snapshot.params.orgId;
    this.contributionService.findMyContributions(this.orgId).subscribe((contributions) => {
        this.dataSource.data = contributions.content.sort((a, b) => b.modificationDate - a.modificationDate);
      },
      (err) => this.uxMessageService.handleError(err)
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

