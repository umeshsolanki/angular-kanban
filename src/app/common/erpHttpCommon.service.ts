import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponseModel} from "./baseResponseModel";

export const PAGE_SIZE: number = 50

export abstract class ErpHttpService<T> {

  baseUrl = "/ews/admin/"
  pageNumber = 0

  protected constructor(private httpClient: HttpClient) {
  }

  abstract moduleUrl(): string

  url(): string {
    return this.baseUrl + this.moduleUrl()
  }

  get(id: String | number): Observable<BaseResponseModel<T>> {
    return this.httpClient.get<BaseResponseModel<T>>(this.url() + "/" + id)
  }

  update(data: T): Observable<BaseResponseModel<T>> {
    return this.httpClient.put<BaseResponseModel<T>>(this.url(), data)
  }

  save(data: T): Observable<BaseResponseModel<T>> {
    return this.httpClient.post<BaseResponseModel<T>>(this.url(), data)
  }

  getPage(pageNumber: number): Observable<BaseResponseModel<T[]>> {
    this.pageNumber = pageNumber
    return this.httpClient.get<BaseResponseModel<T[]>>(this.url() + `/p/${pageNumber}/` + PAGE_SIZE)
  }

  getAll(): Observable<BaseResponseModel<T[]>> {
    return this.httpClient.get<BaseResponseModel<T[]>>(this.url())
  }

}
