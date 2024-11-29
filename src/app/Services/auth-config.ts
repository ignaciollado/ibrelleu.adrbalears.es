import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://tu-proveedor-oauth2.com',
  redirectUri: window.location.origin,
  clientId: 'tu-client-id',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true,
};
