import {ClientSlug} from '../ClientSlug';

export class SetDatabaseConfigurationDto {
  clientSlug: ClientSlug;
  adminDatabase: string;
  cmsDatabase: string;
  fhirDatabase: string;
}
