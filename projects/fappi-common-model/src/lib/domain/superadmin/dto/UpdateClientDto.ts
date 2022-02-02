import {ClientSlug} from '../ClientSlug';

export class UpdateClientDto {
  clientSlug: ClientSlug;
  name: string;
  description: string;
  organizationEnabled: boolean;
  groupEnabled: boolean;
  domain: string;
  defaultUrl: string;
}

