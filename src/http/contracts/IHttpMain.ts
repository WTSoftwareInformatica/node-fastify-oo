export interface IHttpMain<TApp = any> {
  initialize(): Promise<TApp>;
}