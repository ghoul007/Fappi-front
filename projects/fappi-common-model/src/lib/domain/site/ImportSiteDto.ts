import {OrganizationIdDto} from '../organization/resources/OrganizationIdDto';
import {MediaId} from '../commons/MediaId';

export class ImportSiteDto {
  /**
   * Organization to export
   */
  organizationIdDto: OrganizationIdDto;

  /**
   * File that contains the import
   */
  fileToImport: MediaId;
  importNodeTypes = true;
  mergeNodeTypes = true;
  mergeNodes = true;
}
