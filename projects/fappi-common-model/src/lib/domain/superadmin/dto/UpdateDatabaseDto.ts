export class UpdateDatabaseDto {
  databaseId: string;
  name: string;
  description: string;
  databaseUsername: string;
  encryptedPassword: string;
  databaseHost: string;
  databasePort: string;
  driverClassName: string;
}
