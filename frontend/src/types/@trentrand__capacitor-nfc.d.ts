declare module '@trentrand/capacitor-nfc' {
  import type { PluginListenerHandle } from '@capacitor/core';
  export interface NFCRecord {
    recordType: string;
    mediaType?: string;
    data: DataView;
  }
  export interface NFCMessage {
    records: NFCRecord[];
  }
  export interface NFCReadEvent {
    message: NFCMessage;
    serialNumber?: string;
  }
  export interface NFCWriteOptions {
    records: NFCRecord[];
    timeout?: number;
  }
  export interface NFCScanOptions {
    timeout?: number;
  }
  export interface NfcPlugin {
    startScan(options?: NFCScanOptions): Promise<void>;
    stopScan(): Promise<void>;
    write(options: NFCWriteOptions): Promise<void>;
    isEnabled(): Promise<{ enabled: boolean }>;
    addListener(eventName: 'nfcTagRead', listenerFunc: (event: NFCReadEvent) => void): Promise<PluginListenerHandle> & PluginListenerHandle;
    removeAllListeners(): Promise<void>;
  }
  export const Nfc: NfcPlugin;
}