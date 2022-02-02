import {SubscriptionId} from './SubscriptionId';
import {SubscriptionStatus} from './SubscriptionStatus';

export class SubscriptionResource {
  id: SubscriptionId;
  startDate: Date;
  endDate: Date;
  status: SubscriptionStatus;
}
