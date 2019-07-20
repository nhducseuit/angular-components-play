import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FakeHttpService {

  constructor() { }

  checkDuplicate(value: { firstName?: string, lastName?: string }): Observable<boolean> {
    if (value.firstName === 'duc' && value.lastName === 'nguyen') { return of(true).pipe(debounceTime(1000)); }
    return of(false).pipe(debounceTime(1000));
  }
}
