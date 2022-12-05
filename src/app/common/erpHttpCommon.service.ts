import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class ErpHttpService<T> {

  baseUrl = "/ews/admin/"
  abstract moduleUrl():string

  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl+this.moduleUrl())
  }

  getAll(url: string): Observable<T[]> {
    return this.httpClient.get<T[]>(this.baseUrl)
  }

}
