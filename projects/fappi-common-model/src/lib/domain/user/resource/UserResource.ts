import {LanguageResource} from './LanguageResource';

export class UserResource {
  id: string;
  organizationId: string;
  username: string;
  languageResource: LanguageResource;
  firstName: string;
  lastName: string;
  preferredEmail: string;
  authenticationSystemUserId: string;
  deleted: boolean;
}
