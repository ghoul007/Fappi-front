import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {AuditContextResource, AuditService} from 'fappi-common-model';

export class AuditContextResourceDatasource implements DataSource<AuditContextResource> {

  public totalElements = 0;
  private auditsSubject = new BehaviorSubject<AuditContextResource[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private auditService: AuditService, private organizationId: string) {
  }

  connect(collectionViewer: CollectionViewer): Observable<AuditContextResource[]> {
    return this.auditsSubject.asObservable();

  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.auditsSubject.complete();
    this.loadingSubject.complete();
  }

  loadAudit(filter: any,
            sortDirection: string, pageIndex: number, pageSize: number) {

    this.loadingSubject.next(true);

    this.auditService.findAllByOrganization(this.organizationId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        // FIXME throw
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(audits => {
        this.totalElements = (audits as any).totalElements;
        return this.auditsSubject.next((audits as any).content);
      });
  }

}
