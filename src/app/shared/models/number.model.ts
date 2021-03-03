import { IActionType } from './action.model';


export interface IFinalNumber {
  value: number;
  action: IActionType;
  secondValue: number;
}

export type IFinalNumbers = IFinalNumber[];
export type INumber = Pick<IFinalNumber, 'value' | 'action'>;
export type INumbers = INumber[];