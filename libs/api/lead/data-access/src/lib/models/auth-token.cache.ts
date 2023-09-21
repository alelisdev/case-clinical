export class AuthTokenCache {
    private static instance: AuthTokenCache;
    private accessToken: string | null = null;
    private expirationTime: number = 0;
  
    private constructor() {}
  
    static getInstance(): AuthTokenCache {
      if (!AuthTokenCache.instance) {
        AuthTokenCache.instance = new AuthTokenCache();
      }
      return AuthTokenCache.instance;
    }
  
    setToken(token: string, expiresIn: number) {
      this.accessToken = token;
      // Store the expiration time in milliseconds from the current time
      this.expirationTime = new Date().getTime() + expiresIn * 1000;
    }
  
    getToken(): string | null {
      const currentTime = new Date().getTime();
      if (currentTime < this.expirationTime) {
        return this.accessToken;
      }
      return null; // Token has expired or not available
    }
  }