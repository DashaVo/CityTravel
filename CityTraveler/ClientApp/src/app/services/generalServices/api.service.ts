import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}
    post = async (url: string, item: any, withAuth: boolean = true, overrideHeaders: any = null) => {
        return await request(url, {
            method: 'POST',
            headers: overrideHeaders || (withAuth ? headersWithAuthorization() : headers),
            body: JSON.stringify(item)
        });
    }

    put = async (url: string, item: any, withAuth: boolean = true, overrideHeaders: any = null) => {
        return await request(url, {
            method: 'PUT',
            headers: overrideHeaders || (withAuth ? headersWithAuthorization() : headers),
            body: JSON.stringify(item)
        });
    }

    get = async (url: string, withAuth: boolean = true, overrideHeaders: any = null) => {
        return await request(url, {
            method: 'GET',
            headers: overrideHeaders || (withAuth ? headersWithAuthorization() : headers),
        });
    }

    delete = async (url: string, withAuth: boolean = true, overrideHeaders: any = null) => {
        return await request(url, {
            method: 'DELETE',
            headers: overrideHeaders || (withAuth ? headersWithAuthorization() : headers),
        });
    }

};

const headers = {
  'Content-Type': 'application/json',
};

const headersWithAuthorization = () => {
  return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
  };
};

function getAuthToken(): string {
  const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : localStorage.getItem('token');
  return token ? JSON.parse(token) : '';
}

const request = async (url: string, config: any) => {
    const response = await fetch(url, config);
    switch (response.status) {
        case 204:
            return true;
        case 400:
        case 401:
        case 404: {
            let errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        case 200:
        case 304: {
            try {
                if (response.url.includes('/Account/Login')) {
                    throw new Error('Current session was expired.');
                }
                const result = await response.json();
                return result;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        default:
            return new Error(`${response.status}: ${await response.text()}`);
    }
};

