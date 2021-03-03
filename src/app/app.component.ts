import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { IAction } from './shared/models/action.model';
import { IFinalNumber, IFinalNumbers, INumber } from './shared/models/number.model';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public numbers: IFinalNumbers = [];
  

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.getNumbers();
  }


  private getNumbers(): void {
    this._api.fetchNumbers().pipe(
      switchMap(numbers => from(numbers)),
      mergeMap(number => this.getActionValue(number)),
    )
    .subscribe(number => this.numbers = [ ...this.numbers, number ]);
  }

  private getActionValue(number: INumber): Observable<IFinalNumber> {
    return this._api.fetchAction(number.action).pipe(
      map(({ value }: IAction) => ({ ...number, secondValue: value })),
    )
  }

  public trackByFn = (index: number, _: IFinalNumber): number => index

}
