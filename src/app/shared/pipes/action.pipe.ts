import { Pipe, PipeTransform } from '@angular/core';

import { IActionType } from '../models/action.model';
import { IFinalNumber } from '../models/number.model';


export interface IActionPipe {
  sign: '+' | '*';
  fn: (number: IFinalNumber) => number
}

export const ACTION_MAPPER: Record<IActionType, IActionPipe> = {
  add: {
    sign: '+',
    fn: ({ value, secondValue }: IFinalNumber): number => value + secondValue,
  },
  multiply: {
    sign: '*',
    fn: ({ value, secondValue }: IFinalNumber): number => value * secondValue,
  }
}

@Pipe({
  name: 'action'
})
export class ActionPipe implements PipeTransform {

  transform(type: IActionType): IActionPipe {
    return ACTION_MAPPER[ type ] || {};
  }

}
