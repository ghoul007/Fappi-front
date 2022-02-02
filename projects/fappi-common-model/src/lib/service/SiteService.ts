import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, switchMap, tap} from 'rxjs/operators';
import {CreateSiteDto} from '../domain/site/CreateSiteDto';
import {SiteCreatedResource} from '../domain/site/SiteCreatedResource';
import {SiteResource} from '../domain/site/SiteResource';
import {UpdateSiteDto} from '../domain/site/UpdateSiteDto';
import {NodeResource} from '../domain/site/NodeResource';
import {NodeCreatedResource} from '../domain/site/NodeCreatedResource';
import {CreateNodeDto} from '../domain/site/CreateNodeDto';
import {UpdateNodeContentDto} from '../domain/site/UpdateNodeContentDto';
import {ReorderNodeDto} from '../domain/site/ReorderNodeDto';
import {AddCustomTypeDto} from '../domain/site/AddCustomTypeDto';
import {UpdateCustomTypeDto} from '../domain/site/UpdateCustomTypeDto';
import {SetNodePermissionDto} from '../domain/site/SetNodePermissionDto';
import {CustomTypeResource} from '../domain/site/CustomTypeResource';
import {DeleteNodeDto} from '../domain/site/DeleteNodeDto';
import {CustomFieldService} from './CustomFieldService';
import {MoveNodeDto} from '../domain/site/MoveNodeDto';
import {CopyNodeDto} from '../domain/site/CopyNodeDto';
import {NodeTypeIdentifierDto} from '../domain/site/NodeTypeIdentifierDto';
import {FappiUrlService} from './FappiUrlService';
import {DeleteSiteDto} from '../domain/site/DeleteSiteDto';
import {SetNodeMetaDto} from '../domain/site/SetNodeMetaDto';
import {FappiUtils} from './FappiUtils';
import {OperationId} from '../domain/commons/OperationId';
import {FappiPermissionResource} from '../domain/user/resource/FappiPermissionResource';
import {ExportSiteDto} from '../domain/site/ExportSiteDto';
import {ImportSiteDto} from '../domain/site/ImportSiteDto';
import {ChannelResource} from '../domain/site/ChannelResource';
import {SiteVersion} from '../domain/site/SiteVersion';
import {AddChannelDto} from '../domain/site/AddChannelDto';
import {DeleteChannelDto} from '../domain/site/DeleteChannelDto';
import {NodeVersionResource} from '../domain/site/NodeVersionResource';
import {CreateVersionDto} from '../domain/site/CreateVersionDto';
import {MoveUpNodeDto} from '../domain/site/MoveUpNodeDto';
import {MoveDownNodeDto} from '../domain/site/MoveDownNodeDto';
import {debug} from "ng-packagr/lib/utils/log";


@Injectable({
  providedIn: 'root',
})
export class SiteService implements CustomFieldService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrl = '/cms/v1/site';
  private baseUrlChannel = '/cms/v1/site-channel';
  private baseUrlChannelCommmand = '/cms/v1/channel';
  private baseUrlVersion = '/cms/v1/site-version';
  private baseUrlNode = '/cms/v1/node';
  private baseUrlNodeMeta = '/cms/v1/node-meta';
  private baseUrlNodeSearch = '/cms/v1/node-search';
  private baseUrlNodeRights = '/cms/v1/permissions';
  private baseUrlNodeType = '/cms/v1/node-type';
  private baseUrlNodeOperations = '/cms/v1/node-operations';
  private baseUrlNodeTypeOperations = '/cms/v1/maintenance';

  private customTypes: Map<string, CustomTypeResource[]> = new Map();


  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  findAll(orgId: string): Observable<SiteResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/${orgId}/?async=false`, this.httpOptions)
      .pipe(
        map(a => a.body as SiteResource[]));
  }

  findOne(orgId: string, slug: string): Observable<SiteResource> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/${orgId}/${slug}/?async=false`, this.httpOptions)
      .pipe(
        map(a => a.body as SiteResource));
  }

  addSite(site: CreateSiteDto): Observable<SiteCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/?async=false`, site, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as SiteCreatedResource;
        }));
  }

  updateSite(site: UpdateSiteDto): Observable<SiteCreatedResource> {
    return this
      .http.put(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/?async=false`, site, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as SiteCreatedResource;
        }));
  }
  createSiteVersion(version: CreateVersionDto): Observable<SiteCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/create-version?async=false`, version, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as SiteCreatedResource;
        }));
  }

  deleteSite(site: DeleteSiteDto): Observable<void> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/delete?async=false`, site, this.httpOptions)
      .pipe(
        map(a => {
        }));
  }


  findNodes(orgId: string, siteId: string, path: string, withProperties: boolean = false, channel: string = null, versionId: string = null): Observable<NodeResource[]> {
    const channelParam = channel ? '&channelId=' + encodeURIComponent(channel) : '';
    const versionParam = versionId ? '&versionId=' + encodeURIComponent(versionId) : '';
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeSearch}/${orgId}/${siteId}?async=false&path=${path}&withProperties=${withProperties}${channelParam}${versionParam}`, this.httpOptions)
      .pipe(
        map(a => a.body as NodeResource[]));
  }

  findOneNode(orgId: string, siteId: string, slug: string, channelId: string = null, versionId: string = null): Observable<NodeResource> {
    let channelParam = channelId ? '?channelId=' + encodeURIComponent(channelId) : '';
    if (versionId) {
      if (channelParam === '') {
        channelParam = '?async=false&versionId=' + encodeURIComponent(versionId);
      } else {
        channelParam = channelParam + '&async=false&versionId=' + encodeURIComponent(versionId);
      }
    }

    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNode}/${orgId}/${siteId}${slug}${channelParam}`, this.httpOptions)
      .pipe(
        map(a => a.body as NodeResource));
  }

  addNode(createNodeDto: CreateNodeDto): Observable<NodeCreatedResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNode}/?async=false`, createNodeDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as NodeCreatedResource;
        }));
  }

  reorderNode(reorder: ReorderNodeDto): Observable<any> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeOperations}/reorder?async=false`, reorder, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }

  moveNode(move: MoveNodeDto): Observable<any> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeOperations}/move?async=false`, move, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }

  moveUp(move: MoveUpNodeDto): Observable<any> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeOperations}/moveUp?async=false`, move, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }

  moveDown(move: MoveDownNodeDto): Observable<any> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeOperations}/moveDown?async=false`, move, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }

  copyNode(copy: CopyNodeDto): Observable<any> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeOperations}/copy?async=false`, copy, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }


  updateNode(orgId: string, siteId: string, slug: string, properties: any, name: string, channelId: string = null): Observable<OperationId> {
    const updateNodeDto = new UpdateNodeContentDto();
    updateNodeDto.nodeSiteSlug.organizationId = orgId;
    updateNodeDto.nodeSiteSlug.elementId = siteId;
    updateNodeDto.nodeSiteSlug.nodeSlug.slug = slug;
    updateNodeDto.properties = properties;
    updateNodeDto.name = name;
    updateNodeDto.channelId = channelId;
    updateNodeDto.contextId = FappiUtils.uuid();
    return this
      .http.put(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNode}/?async=false`, updateNodeDto, this.httpOptions)
      .pipe(
        map(a => {
          return new OperationId(updateNodeDto.contextId);
        }));
  }

  updateNodeMeta(orgId: string, siteId: string, slug: string, meta: any, patch: boolean): Observable<OperationId> {
    const setNodeMetaDto = new SetNodeMetaDto();
    setNodeMetaDto.nodeSiteSlug.organizationId = orgId;
    setNodeMetaDto.nodeSiteSlug.elementId = siteId;
    setNodeMetaDto.nodeSiteSlug.nodeSlug.slug = slug;
    setNodeMetaDto.properties = meta;
    setNodeMetaDto.patch = patch;
    setNodeMetaDto.contextId = FappiUtils.uuid();
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeMeta}/?async=false`, setNodeMetaDto, this.httpOptions)
      .pipe(
        map(a => {
          return new OperationId(setNodeMetaDto.contextId);
        }));
  }

  findNodeTypes(orgId: string, siteId: string): Observable<CustomTypeResource[]> {
    const cacheKey = orgId + '$' + siteId;
    if (this.customTypes.has(cacheKey)) {
      return of(this.customTypes.get(cacheKey));
    }
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeType}/${orgId}/${siteId}/?async=false`, this.httpOptions)
      .pipe(
        map(a => a.body as CustomTypeResource[]),
        tap( a => {
          if (a) {
            this.customTypes.set(cacheKey, a);
          }
        })
      );
  }

  /**
   * Find all (global or general)
   * @param orgId
   * @param siteId
   */
  findAllNodeTypes(orgId: string, siteId: string): Observable<CustomTypeResource[]> {
    return this.findNodeTypes(orgId, siteId).pipe(
      switchMap((list, index) => {
        return this.findNodeTypes(orgId, '0');
      })
    );
  }


  findOneNodeType(orgId: string, nodeType: NodeTypeIdentifierDto): Observable<CustomTypeResource> {

    // FIXME there is a bug with element ids. This only works with 0
    /*    nodeType.id.elementId = '0';

     const cacheKey = orgId + '$' + nodeType.id.elementId;
     if (this.customTypes.has(cacheKey)) {
       return of(this.customTypes.get(cacheKey).filter(a => a.id.slug === nodeType.slug).pop());
     }

     return this.findAllNodeTypes(orgId, nodeType.id.elementId).pipe(map(( all ) => {
       return this.customTypes.get(cacheKey).filter(a => a.id.slug === nodeType.slug).pop();
     }));
  */
     return this
       .http
       .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeType}/${orgId}/${nodeType.id.elementId}/${nodeType.slug}`,
         this.httpOptions)
       .pipe(
         map(a => a.body as CustomTypeResource));
  }


  addNodeType(nodeTypeDto: AddCustomTypeDto): Observable<any> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeType}/?async=false`, nodeTypeDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }

  updateNodeType(nodeTypeDto: UpdateCustomTypeDto): Observable<any> {// FIXME type the return
    return this
      .http.put(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeType}/?async=false`, nodeTypeDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }

  deleteNode(orgId: string, siteId: string, slug: string) {
    const deleteNodeDto = new DeleteNodeDto();
    deleteNodeDto.nodeSiteSlug.organizationId = orgId;
    deleteNodeDto.nodeSiteSlug.elementId = siteId;
    deleteNodeDto.nodeSiteSlug.nodeSlug.slug = slug;

    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNode}/delete?async=false`, deleteNodeDto, this.httpOptions)
      .pipe(
        map(a => {
          return;
        }));
  }

  findNodeRights(orgId: string, siteId: string, path: string): Observable<FappiPermissionResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeRights}/${orgId}/${siteId}?path=${path}&async=false`, this.httpOptions)
      .pipe(
        map(a => a.body as FappiPermissionResource[]));
  }

  setNodePermission(setNodePermission: SetNodePermissionDto): Observable<any> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeOperations}/set-node-permissions?async=false`,
        setNodePermission, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }


  findVersions(orgId: string, siteId: string): Observable<NodeVersionResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlVersion}/${orgId}/${siteId}?async=false`, this.httpOptions)
      .pipe(
        map(a => a.body as NodeVersionResource[]));
  }

  findChannels(orgId: string, siteId: string): Observable<ChannelResource[]> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlChannel}/${orgId}/${siteId}?async=false`, this.httpOptions)
      .pipe(
        map(a => a.body as ChannelResource[]));
  }

  addChannel(addChannelDto: AddChannelDto) {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlChannelCommmand}/add?async=false`, addChannelDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }
  deleteChannel(deleteChannelDto: DeleteChannelDto) {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlChannelCommmand}/delete?async=false`, deleteChannelDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }

  /**
   * Export nodes and other things about a site
   * @param dto what to export
   */
  exportNode(dto: ExportSiteDto) {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeTypeOperations}/export?async=false`,
        dto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }

  /**
   * Import nodes and other things about a site
   * @param dto what to import
   */
  importNode(dto: ImportSiteDto) {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlNodeTypeOperations}/import?async=false`,
        dto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as any;
        }));
  }
}
