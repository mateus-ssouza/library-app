import { Observable } from 'rxjs';

export interface ServiceInterface<T> {
  GetAll(): Observable<T[]>;
  GetById(id: string): Observable<T>;
  Update(id: string, item: T): Observable<any>;
  Add(item: T): Observable<any>;
  Delete(id: string): Observable<any>;
}
