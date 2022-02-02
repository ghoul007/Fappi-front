/**
 * The id of an operation (when calling async method, a context id is set and we can wait for the result with this id).  Also know as
 * contextId
 */
export class OperationId {
  constructor(public contextId: string) {
  }
}
