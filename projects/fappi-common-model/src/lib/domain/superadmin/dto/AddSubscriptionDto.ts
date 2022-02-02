import {ClientSlug} from '../ClientSlug';
import {SubscriptionId} from '../SubscriptionId';
import {SubscriptionPeriod} from '../SubscriptionPeriod';

export class AddSubscriptionDto {
  clientSlug: ClientSlug;
  subscriptionId: SubscriptionId;
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  period: SubscriptionPeriod;
}
