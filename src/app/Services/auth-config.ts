import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://el-proveedor-oauth2.com',
  redirectUri: window.location.origin,
  clientId: 'el-client-id',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
};
