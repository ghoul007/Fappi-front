import {MediaId} from '../commons/MediaId';
import {Language} from '../commons/Language';

export class Personalization {
  logo: MediaId;
  poweredByText: string;
  colorScheme: string;
  customCss: string;
  emailFooter: Map<Language, string>;
}
