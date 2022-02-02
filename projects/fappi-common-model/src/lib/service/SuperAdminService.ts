import {Injectable} from '@angular/core';
import {CreateClientDto} from '../domain/superadmin/dto/CreateClientDto';
import {Observable} from 'rxjs';
import {ClientOperationReturnResource} from '../domain/superadmin/resource/ClientOperationReturnResource';
import {DisableClientDto} from '../domain/superadmin/dto/DisableClientDto';
import {DeleteClientCommand} from '../domain/superadmin/dto/DeleteClientCommand';
import {ConfirmDeleteClientCommand} from '../domain/superadmin/dto/ConfirmDeleteClientCommand';
import {SetClientPersonalizationDto} from '../domain/superadmin/dto/SetClientPersonalizationDto';
import {UpdateClientDto} from '../domain/superadmin/dto/UpdateClientDto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PageResource} from '../domain/PageResource';
import {ClientResource} from '../domain/superadmin/resource/ClientResource';
import {AddSubscriptionDto} from '../domain/superadmin/dto/AddSubscriptionDto';
import {SubscriptionResource} from '../domain/superadmin/SubscriptionResource';
import {ConfirmSubscriptionDto} from '../domain/superadmin/dto/ConfirmSubscriptionDto';
import {CancelSubscriptionDto} from '../domain/superadmin/dto/CancelSubscriptionDto';
import {DeleteSubscriptionDto} from '../domain/superadmin/dto/DeleteSubscriptionDto';
import {ConfirmDeleteSubscriptionDto} from '../domain/superadmin/dto/ConfirmDeleteSubscriptionDto';
import {ConfirmCreateClientCommand} from '../domain/superadmin/dto/ConfirmCreateClientCommand';
import {FappiUrlService} from './FappiUrlService';
import {DatabaseResource} from '../domain/superadmin/resource/DatabaseResource';
import {UpdateDatabaseDto} from '../domain/superadmin/dto/UpdateDatabaseDto';
import {RegisterDatabaseDto} from '../domain/superadmin/dto/RegisterDatabaseDto';
import {SetDatabaseConfigurationDto} from '../domain/superadmin/dto/SetDatabaseConfigurationDto';
import {InitDatabaseDto} from '../domain/superadmin/dto/InitDatabaseDto';
import {CryptoConfigs} from "../domain/superadmin/resource/crypto/CryptoConfigs";
import {AddCryptoConfigDto} from "../domain/superadmin/dto/crypto/AddCryptoConfigDto";
import {UpdateCryptoConfigDto} from "../domain/superadmin/dto/crypto/UpdateCryptoConfigDto";
import {SetDefaultCryptoConfigDto} from "../domain/superadmin/dto/crypto/SetDefaultCryptoConfigDto";

@Injectable({
  providedIn: 'root',
})
export class SuperAdminService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,
    observe: 'response' as 'response'
  };
  private baseUrl = '/api/superadmin/client';
  private baseUrlDatabase = '/api/superadmin/database';
  private baseUrlCrypto = '/api/superadmin/crypto-configuration';
  private baseUrlCryptoClient = '/api/superadmin/client/crypto-configuration';
  private baseUrlSubscription = '/api/superadmin/subscription';
  private urlCurrentClient = '/api/superadmin/public/current-client';

  constructor(private http: HttpClient, private fappiUrlService: FappiUrlService) {
  }

  create(createClientDto: CreateClientDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/create`, createClientDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  delete(deleteClientCommand: DeleteClientCommand): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/delete`, deleteClientCommand, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  confirmDelete(confirmDeleteClientCommand: ConfirmDeleteClientCommand): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/confirmDelete`, confirmDeleteClientCommand, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  confirmCreateClient(confirmCreateClientDto: ConfirmCreateClientCommand): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/command/ConfirmCreateClientCommand`, confirmCreateClientDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  disable(disableClientDto: DisableClientDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/disable`, disableClientDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  setPersonalization(setClientPersonalizationDto: SetClientPersonalizationDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/personalization`, setClientPersonalizationDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }


  update(updateClientDto: UpdateClientDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/update`, updateClientDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }


  findAll(): Observable<PageResource<ClientResource>> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/`, this.httpOptions)
      .pipe(
        map(a => a.body as PageResource<ClientResource>));
  }

  findOne(id: string): Observable<ClientResource> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
        map(a => a.body as ClientResource));
  }


  findCurrent(): Observable<ClientResource> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.urlCurrentClient}/`, this.httpOptions)
      .pipe(
        map(a => a.body as ClientResource));
  }

  addSubscription(subscriptionDto: AddSubscriptionDto) {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlSubscription}/add-subscription`, subscriptionDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  findAllSubscriptions(clientId: string): Observable<PageResource<SubscriptionResource>> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlSubscription}/${clientId}`, this.httpOptions)
      .pipe(
        map(a => a.body as PageResource<SubscriptionResource>));
  }

  activateSubscription(confirmSubscriptionDto: ConfirmSubscriptionDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlSubscription}/confirm-subscription`, confirmSubscriptionDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  cancelSubscription(dto: CancelSubscriptionDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlSubscription}/cancel-subscription`, dto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  deleteSubscription(dto: DeleteSubscriptionDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlSubscription}/delete-subscription`, dto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  forceDeleteSubscription(dto: ConfirmDeleteSubscriptionDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlSubscription}/confirm-delete-subscription`, dto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  findAllDatabases(): Observable<PageResource<DatabaseResource>> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlDatabase}`, this.httpOptions)
      .pipe(
        map(a => a.body as PageResource<DatabaseResource>));
  }

  findOneDatabase(id: string): Observable<DatabaseResource> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlDatabase}/${id}`, this.httpOptions)
      .pipe(
        map(a => a.body as DatabaseResource));
  }

  registerDatabase(registerDatabaseDto: RegisterDatabaseDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlDatabase}/register`, registerDatabaseDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }
  testDatabaseConnection(registerDatabaseDto: RegisterDatabaseDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlDatabase}/test-database-connection`,
        registerDatabaseDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }



  updateDatabase(updateDatabaseDto: UpdateDatabaseDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlDatabase}/update`, updateDatabaseDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  setClientDatabaseConfiguration(setDatabaseConfigurationDto: SetDatabaseConfigurationDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/set-database-configuration`, setDatabaseConfigurationDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }


  initClientDatabase(initDatabaseDto: InitDatabaseDto): Observable<ClientOperationReturnResource> {
    return this
      .http.post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrl}/init-database`, initDatabaseDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }


  findCryptoConfigs(clientId: string): Observable<CryptoConfigs> {
    return this
      .http
      .get(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlCryptoClient}/${clientId}`, this.httpOptions)
      .pipe(
        map(a => a.body as CryptoConfigs));
  }

  addCryptoConfig(addCryptoConfigDto: AddCryptoConfigDto): Observable<ClientOperationReturnResource> {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlCrypto}/add`, addCryptoConfigDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  updateCryptoConfig(updateCryptoConfigDto: UpdateCryptoConfigDto): Observable<ClientOperationReturnResource> {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlCrypto}/update`, updateCryptoConfigDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }

  setDefaultCryptoConfig(setDefaultCryptoConfigDto: SetDefaultCryptoConfigDto): Observable<ClientOperationReturnResource> {
    return this
      .http
      .post(`${this.fappiUrlService.apiBaseUrl}${this.baseUrlCrypto}/set-default`, setDefaultCryptoConfigDto, this.httpOptions)
      .pipe(
        map(a => {
          return a.body as ClientOperationReturnResource;
        }));
  }
}
