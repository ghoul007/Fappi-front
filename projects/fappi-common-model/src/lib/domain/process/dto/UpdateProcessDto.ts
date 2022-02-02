import {ProcessDefinitionIdDto} from './ProcessDefinitionIdDto';

export class UpdateProcessDto {
  processDefinitionId: ProcessDefinitionIdDto;
  name: string;
  contentXml: string;
}
