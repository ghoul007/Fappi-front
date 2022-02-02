import {TableDataSource} from './table-data-source';

import {TableElement} from './table-element';

export class TableElementTemplateDriven<T> extends TableElement<T> {
  id: number;
  originalData?: T;
  source: TableDataSource<T>;

  constructor(init: Partial<TableElementTemplateDriven<T>>) {
    super();
    Object.assign(this, init);
  }

  _editing: boolean;

  get editing(): boolean {
    return this._editing;
  }

  set editing(value: boolean) {
    this._editing = value;
  }

  _currentData: T;

  get currentData(): T {
    return this._currentData;
  }

  set currentData(data: T) {
    this._currentData = data;
  }

  get validator(): any {
    return null;
  }

  set validator(value: any) {
  }

  isValid() {
    return true;
  }
}
