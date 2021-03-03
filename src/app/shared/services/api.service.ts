import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, publishLast, refCount } from 'rxjs/operators';

import { IAction, IActionType } from '../models/action.model';
import { INumbers } from '../models/number.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private cachedActions: Map<IActionType, Observable<IAction>> = new Map();


  constructor(private _http: HttpClient, private _snackBar: MatSnackBar) { }


  public fetchNumbers(): Observable<INumbers> {
    return this._http.get<INumbers>('../assets/json/numbers.json').pipe(
      catchError(() => {
        this._snackBar.open('Server Error')
        return EMPTY
      })
    )
  }

  public fetchAction(type: IActionType): Observable<IAction> {

    if (!this.cachedActions.has(type)) {
      const cachedAction$ = this._http.get<IAction>(`../assets/json/${ type }.json`).pipe(
        publishLast(),
        refCount(),
        catchError(() => of({} as IAction)),
      )

      this.cachedActions.set(type, cachedAction$);
    }

    return this.cachedActions.get(type) as Observable<IAction>;
  }

}
