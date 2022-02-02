import {ClientSlug} from '../ClientSlug';
import {Language} from '../../commons/Language';
import {PersonalizationResource} from '../PersonalizationResource';
import {SubscriptionResource} from '../SubscriptionResource';
import {ClientStatus} from '../ClientStatus';

export class ClientResource {

  slug: ClientSlug;
  name: string;
  description: string;
  defaultLanguage: Language;
  personalization: PersonalizationResource;
  subscriptions: SubscriptionResource[];
  organizationEnabled: boolean;
  groupEnabled: boolean;
  domain: string;
  status: ClientStatus;
  adminDatabaseId: string;
  cmsDatabaseId: string;
}
