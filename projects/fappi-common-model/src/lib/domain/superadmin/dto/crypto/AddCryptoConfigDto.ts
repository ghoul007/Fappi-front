import {ClientSlug} from '../../ClientSlug';

export class AddCryptoConfigDto {
  clientSlug: ClientSlug;
  id: string;
  algorithm: string;
  encrypKey: string;
  decrypSecretKey: string;
  salt: string;
}
