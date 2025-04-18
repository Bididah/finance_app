import { Inject, Injectable, InjectionToken } from '@angular/core';

export const SESSION_STORAGE = new InjectionToken<Storage>('Session Storage', {
  providedIn: 'root',
  factory: () => sessionStorage,
});

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(SESSION_STORAGE) private storage: Storage) {}

  getString(key: string): string | undefined {
    return this.storage.getItem(key) ?? undefined;
  }

  setString(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  getObject<T>(key: string): T | undefined {
    try {
      const value = this.storage.getItem(key);
      return value ? (JSON.parse(value) as T) : undefined;
    } catch (e) {
      console.log(e);
    }
    return undefined;
  }

  setObject<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }
}
