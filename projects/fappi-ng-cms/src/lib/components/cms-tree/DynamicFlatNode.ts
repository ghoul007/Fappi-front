/** Flat node with expandable and level information */
import {NodeResource} from 'fappi-common-model';

export class DynamicFlatNode {
  constructor(public nodeResource: NodeResource, public level: number, public isLoading = false) {
  }
}
