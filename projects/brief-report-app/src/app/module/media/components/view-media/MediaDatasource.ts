import {DataSource} from '@angular/cdk/collections';
import {Observable, of} from 'rxjs';
import {MediaResource} from 'fappi-common-model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

export class MediaDatasource implements DataSource<MediaResource> {

  public page: Observable<MediaResource[]>;
  private startIndex = 0;
  private pageSize = 20;

  constructor(private resources: MediaResource[]) {
    this.refreshPage();
  }

  private _paginator: MatPaginator;

  get paginator(): MatPaginator {
    return this._paginator;
  }

  set paginator(value: MatPaginator) {

    if (value === this._paginator) {
      return;
    }

    this._paginator = value;
    if (this.paginator) {
      this._paginator.page.subscribe((event: PageEvent) => {
        // event.pageIndex;
        this.startIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.refreshPage();
      });
    }
  }

  refreshPage() {
    this.page = of(this.resources.slice(this.startIndex, this.pageSize + this.startIndex));
  }


  connect(): Observable<MediaResource[]> {
    return this.page;
  }

  disconnect(): void {
  }
}
