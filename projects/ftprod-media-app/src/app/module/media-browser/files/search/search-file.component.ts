import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UXMessageService} from 'fappi-ng-material-kit';
import {MatDialog} from '@angular/material/dialog';
import {FileChooserComponent} from 'fappi-ng-media';

@Component({
  selector: 'app-search-file-view',
  templateUrl: './search-file.component.html',
  styleUrls: ['./search-file.component.scss']
})
export class SearchFileComponent implements AfterViewInit {

  public orgId: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private uxMessageService: UXMessageService,
              public dialog: MatDialog
  ) {
    this.route.paramMap.subscribe(params => {
      this.orgId = this.route.parent.parent.parent.parent.snapshot.params.orgId;
    });
  }


  ngAfterViewInit() {
  }

  addFile() {
    const dialogRef = this.dialog.open(FileChooserComponent, {
      width: '650px', data: {orgId: this.orgId}
    });
    dialogRef.afterClosed().subscribe(result => {
      alert(result.media.name);
    });
  }

}
