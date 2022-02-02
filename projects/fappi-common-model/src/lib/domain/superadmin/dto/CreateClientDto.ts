import {ClientSlug} from '../ClientSlug';

export class CreateClientDto {
  clientSlug: ClientSlug;
  name: string;
  description: string;
}
