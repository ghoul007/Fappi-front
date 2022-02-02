export class AuditContextResource {
  id: string;

  tenant: string;
  orgId: string;
  username: string;
  ip: string;
  service: string;

  action: string;
  actionDescription: string;
  actionDate: Date;

  elementType: string;
  elementRef: string;
}
