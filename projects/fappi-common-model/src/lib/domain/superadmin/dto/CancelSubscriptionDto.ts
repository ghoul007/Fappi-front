import {ClientSlug} from '../ClientSlug';
import {SubscriptionId} from '../SubscriptionId';

export class CancelSubscriptionDto {
  clientSlug: ClientSlug;
  subscriptionId: SubscriptionId;
}

