import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IconRegistration {

  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    this.registerCountries(matIconRegistry, domSanitizer);

  }

  registerCountries(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon(
      'country_GBR',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/GBR.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_FRA',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/FRA.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_BEL',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/BEL.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_CAN',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/CAN.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_USA',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/USA.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_URY',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/URY.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_ESP',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/ESP.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_DNK',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/DNK.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_ISL',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/ISL.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_IRL',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/IRL.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_ITA',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/ITA.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_GRC',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/GRC.svg')
    );
    matIconRegistry.addSvgIcon(
      'country_CHN',
      domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/countries/CHN.svg')
    );
  }

}
