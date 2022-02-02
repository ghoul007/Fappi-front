export class Task {
  id: string;
  name: string;
  createdDate: Date;
  priority: number;
  processDefinitionId: string;
  processInstanceId: string;
  status: string;
  formKey: string;
  variables: any;
  outcomeActions: { key: string, label: string }[];
}
