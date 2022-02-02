import {ProcessDefinitionIdDto} from './ProcessDefinitionIdDto';

export class AddProcessDto {
  processDefinitionId: ProcessDefinitionIdDto;
  name: string;
  contentXml: string;
}
