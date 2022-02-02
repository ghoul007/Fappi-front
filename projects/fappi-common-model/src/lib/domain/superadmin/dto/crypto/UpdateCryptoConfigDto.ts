import {ClientSlug} from '../../ClientSlug';

export class UpdateCryptoConfigDto {
  clientSlug: ClientSlug;
  id: string;
  algorithm: string;
  encrypKey: string;
  decrypSecretKey: string;
  salt: string;
}
