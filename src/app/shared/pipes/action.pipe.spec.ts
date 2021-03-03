import { IActionType } from '../models/action.model';
import { ACTION_MAPPER, ActionPipe, IActionPipe } from './action.pipe';

describe('ActionPipe', () => {
  let pipe: ActionPipe;

  beforeEach(() => {
    pipe = new ActionPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('pass the right obj for the "add" action', () => {
    expect(pipe.transform('add')).toBe(ACTION_MAPPER[ 'add' ])
  });

  it('pass the right obj for the "multiply" action', () => {
    expect(pipe.transform('multiply')).toBe(ACTION_MAPPER[ 'multiply' ])
  });

  it('pass the empty obj for the not valid action', () => {
    expect(pipe.transform('' as IActionType)).toEqual({} as IActionPipe)
  });
});
