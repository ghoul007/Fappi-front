import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {NodeResource, NodeSlug, SiteService, UserInfoService} from 'fappi-common-model';
import {Observable} from 'rxjs';
import {UXMessageService} from 'fappi-ng-material-kit/lib/u-x-message.service';

export class NodeDataSource extends DataSource<NodeResource> {

  constructor(protected siteService: SiteService,
              protected uxMessageService: UXMessageService,
              private selectedOrganizationId: string,
              private selectedSiteId: string,
              private nodeSlug: NodeSlug,
              protected userInfoService: UserInfoService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<NodeResource[] | ReadonlyArray<NodeResource>> {
    return this.siteService.findNodes(this.selectedOrganizationId, this.selectedSiteId, this.nodeSlug.slug, true);
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}
