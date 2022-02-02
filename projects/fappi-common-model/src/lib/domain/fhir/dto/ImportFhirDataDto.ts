export enum ImportFhirDataType {
  FHIR = 'FHIR',
  CDA = 'CDA',
  HL7 = 'HL7'
}
export class ImportFhirDataDto {
  orgId: string;
  mediaId: string;
  dataType: ImportFhirDataType;
}
