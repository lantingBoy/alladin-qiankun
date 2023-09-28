declare global {
  interface Window {
    qiankunStarted: boolean;
  }
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string;
  }
}

export {};
