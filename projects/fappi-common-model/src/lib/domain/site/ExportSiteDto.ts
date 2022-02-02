import {OrganizationIdDto} from '../organization/resources/OrganizationIdDto';

export class ExportSiteDto {
  /**
   * The file where to export node types
   */
  name: string;
  /**
   * Organization to export
   */
  organizationIdDto: OrganizationIdDto;

  /**
   * Export node types
   */
  exportNodeTypes = true;
  /**
   * Export global node types
   */
  exportGlobalNodeTypes = true;
  /**
   * Export sites and nodes
   */
  exportSites = true;
}
