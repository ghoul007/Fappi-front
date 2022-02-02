import {UpdateDatabaseDto} from './UpdateDatabaseDto';

export class RegisterDatabaseDto extends UpdateDatabaseDto {
  driverClassName: string;
}
