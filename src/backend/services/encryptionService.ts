/**
 * Service for encrypting and decrypting sensitive data
 */
export class EncryptionService {
  private encryptionKey: string;
  private algorithm = "AES-GCM";

  constructor(key?: string) {
    // In a real implementation, this would use a secure key management system
    // For demo purposes, use a provided key or generate a random one
    this.encryptionKey = key || this.generateRandomKey();
  }

  /**
   * Encrypt sensitive data
   * @param data Data to encrypt
   */
  public async encrypt(data: string): Promise<string> {
    try {
      // In a real implementation, this would use the Web Crypto API
      // For demo purposes, use a simple Base64 encoding with a prefix
      const encodedData = btoa(data);
      return `ENC_${encodedData}_${this.generateRandomString(8)}`;
    } catch (error) {
      console.error("Encryption error:", error);
      throw new Error("Failed to encrypt data");
    }
  }

  /**
   * Decrypt encrypted data
   * @param encryptedData Encrypted data to decrypt
   */
  public async decrypt(encryptedData: string): Promise<string> {
    try {
      // In a real implementation, this would use the Web Crypto API
      // For demo purposes, extract the Base64 encoded data and decode it
      if (!encryptedData.startsWith("ENC_")) {
        throw new Error("Invalid encrypted data format");
      }

      const parts = encryptedData.split("_");
      if (parts.length < 2) {
        throw new Error("Invalid encrypted data format");
      }

      const encodedData = parts[1];
      return atob(encodedData);
    } catch (error) {
      console.error("Decryption error:", error);
      throw new Error("Failed to decrypt data");
    }
  }

  /**
   * Encrypt credentials for secure storage
   * @param credentials User credentials
   */
  public async encryptCredentials(credentials: {
    rollNumber: string;
    password: string;
  }): Promise<string> {
    const credentialsString = JSON.stringify(credentials);
    return this.encrypt(credentialsString);
  }

  /**
   * Decrypt stored credentials
   * @param encryptedCredentials Encrypted credentials string
   */
  public async decryptCredentials(encryptedCredentials: string): Promise<{
    rollNumber: string;
    password: string;
  }> {
    const credentialsString = await this.decrypt(encryptedCredentials);
    return JSON.parse(credentialsString);
  }

  /**
   * Generate a random encryption key
   */
  private generateRandomKey(): string {
    // In a real implementation, this would use the Web Crypto API to generate a secure key
    // For demo purposes, generate a random string
    return this.generateRandomString(32);
  }

  /**
   * Generate a random string of specified length
   * @param length Length of the random string
   */
  private generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
