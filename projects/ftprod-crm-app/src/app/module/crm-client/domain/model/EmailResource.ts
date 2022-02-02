import {EmailId} from './EmailId';
import {EmailStatus} from './EmailStatus';

export class EmailResource {
  id: EmailId;
  email: string;
  isDefault: boolean;
  isBusiness: boolean;
  optin: boolean;
  active: boolean;
  status: EmailStatus;
}
