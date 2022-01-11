import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  public get(key: string, type: StorageType) {
    switch (type) {
      case 'session':
        return sessionStorage.getItem(key);
      case 'global':
        return localStorage.getItem(key);
    }
  }

  public set(key: string, obj: any, type: StorageType) {
    switch (type) {
      case 'session':
        return sessionStorage.setItem(key, JSON.stringify(obj));
      case 'global':
        return localStorage.setItem(key, JSON.stringify(obj));
    }
  }

  public push(key: string, obj: any, type: StorageType) {
    switch (type) {
      case 'session':
        var oldData = JSON.parse(this.get(key, type));
        try{
          return sessionStorage.setItem(key, JSON.stringify(obj.concat(oldData)));
        }
        catch {
          return sessionStorage.setItem(key, oldData);
        }
      case 'global':
        var oldData = JSON.parse(this.get(key, type));
        try{
          return localStorage.setItem(key, JSON.stringify(obj.concat(oldData)));
        }
        catch {
          return localStorage.setItem(key, oldData);
        }
    }
  }

  public clear(type: StorageType) {
    switch (type) {
      case 'session':
        sessionStorage.clear();
        break;
      case 'global':
        localStorage.clear();
        break;
    }
  }

  public remove(key: string, type: StorageType) {
    switch (type) {
      case 'session':
        sessionStorage.removeItem(key);
        break;
      case 'global':
        localStorage.removeItem(key);
        break;
    }
  }
}

type StorageType = 'session' | 'global';
