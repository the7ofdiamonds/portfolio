export class SecureHeaders  {
  accessToken: string | null;
  refreshToken: string | null;
  contentType: string;
  userAgent: string | null;
  errorMessage: string | null = null;

  constructor(
    accessToken: string | null,
    refreshToken: string | null,
    contentType: string = 'application/json',
    userAgent: string = ''
  ) {
    if (!accessToken) {
      this.errorMessage = 'Access Token could not be found';
    }

    this.accessToken = accessToken;
    this.refreshToken = refreshToken ?? '';
    this.contentType = contentType;
    this.userAgent = userAgent;
  }

  toObject() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Refresh-Token': this.refreshToken ?? '',
      'Content-Type': this.contentType,
      'User-Agent': this.userAgent ?? '',
    };
  }
}