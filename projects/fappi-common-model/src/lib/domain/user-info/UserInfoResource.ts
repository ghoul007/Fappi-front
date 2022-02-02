export class Authority {
  attributes: any;
  authority: string;

}

export class UserInfoResource {
  authenticated: boolean;
  authorities: Authority[];
  authorizedClientRegistrationId: string;
  name: string;
  principal: any;
}


