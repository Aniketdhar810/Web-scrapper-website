/**
 * Service for managing and rotating proxies during scraping
 */
export class ProxyManager {
  private proxies: Proxy[] = [];
  private currentProxyIndex: number = -1;
  private maxConsecutiveFailures: number = 3;

  constructor(proxyList?: string[]) {
    if (proxyList && proxyList.length > 0) {
      this.addProxies(proxyList);
    }
  }

  /**
   * Add proxies to the manager
   * @param proxyList List of proxy URLs (e.g., "http://username:password@ip:port")
   */
  public addProxies(proxyList: string[]): void {
    for (const proxyUrl of proxyList) {
      try {
        const proxy = this.parseProxyUrl(proxyUrl);
        this.proxies.push({
          ...proxy,
          url: proxyUrl,
          consecutiveFailures: 0,
          lastUsed: null,
          banned: false,
        });
      } catch (error) {
        console.error(`Invalid proxy URL: ${proxyUrl}`, error);
      }
    }

    console.log(`Added ${this.proxies.length} proxies to the manager`);
  }

  /**
   * Get the next available proxy
   */
  public getNextProxy(): Proxy | null {
    if (this.proxies.length === 0) {
      return null;
    }

    // Find the next non-banned proxy
    let attempts = 0;
    while (attempts < this.proxies.length) {
      this.currentProxyIndex =
        (this.currentProxyIndex + 1) % this.proxies.length;
      const proxy = this.proxies[this.currentProxyIndex];

      if (!proxy.banned) {
        proxy.lastUsed = new Date();
        return proxy;
      }

      attempts++;
    }

    console.warn("All proxies are banned. Consider adding more proxies.");
    return null;
  }

  /**
   * Report a proxy failure
   * @param proxyUrl The URL of the proxy that failed
   */
  public reportProxyFailure(proxyUrl: string): void {
    const proxyIndex = this.proxies.findIndex((p) => p.url === proxyUrl);
    if (proxyIndex === -1) return;

    const proxy = this.proxies[proxyIndex];
    proxy.consecutiveFailures++;

    console.log(
      `Proxy ${proxyUrl} failed (${proxy.consecutiveFailures}/${this.maxConsecutiveFailures})`,
    );

    if (proxy.consecutiveFailures >= this.maxConsecutiveFailures) {
      console.log(`Banning proxy ${proxyUrl} due to consecutive failures`);
      proxy.banned = true;

      // Schedule unbanning after some time (e.g., 30 minutes)
      setTimeout(
        () => {
          proxy.banned = false;
          proxy.consecutiveFailures = 0;
          console.log(`Unbanned proxy ${proxyUrl}`);
        },
        30 * 60 * 1000,
      );
    }
  }

  /**
   * Report a proxy success
   * @param proxyUrl The URL of the proxy that succeeded
   */
  public reportProxySuccess(proxyUrl: string): void {
    const proxyIndex = this.proxies.findIndex((p) => p.url === proxyUrl);
    if (proxyIndex === -1) return;

    const proxy = this.proxies[proxyIndex];
    proxy.consecutiveFailures = 0;
  }

  /**
   * Get the count of available (non-banned) proxies
   */
  public getAvailableProxyCount(): number {
    return this.proxies.filter((p) => !p.banned).length;
  }

  /**
   * Parse a proxy URL into its components
   * @param proxyUrl Proxy URL (e.g., "http://username:password@ip:port")
   */
  private parseProxyUrl(proxyUrl: string): {
    protocol: string;
    host: string;
    port: number;
    auth?: { username: string; password: string };
  } {
    try {
      const url = new URL(proxyUrl);

      let auth;
      if (url.username && url.password) {
        auth = {
          username: url.username,
          password: url.password,
        };
      }

      return {
        protocol: url.protocol.replace(":", ""),
        host: url.hostname,
        port: parseInt(url.port || "80"),
        auth,
      };
    } catch (error) {
      throw new Error(`Invalid proxy URL: ${proxyUrl}`);
    }
  }
}

/**
 * Proxy interface
 */
export interface Proxy {
  protocol: string;
  host: string;
  port: number;
  auth?: {
    username: string;
    password: string;
  };
  url: string;
  consecutiveFailures: number;
  lastUsed: Date | null;
  banned: boolean;
}
