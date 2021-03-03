import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { IFinalNumbers, INumbers } from './shared/models/number.model';
import { ActionPipe } from './shared/pipes/action.pipe';
import { ApiService } from './shared/services/api.service';

describe('AppComponent', () => {
  let testNumbers: INumbers;
  let expectedNumbers: IFinalNumbers;
  const testAddValue: number = 10;
  const testMultiplyValue: number = 20;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    testNumbers = [
      { "value": 10, "action": "add" },
      { "value": 20, "action": "multiply" },
      { "value": 30, "action": "multiply" },
      { "value": 40, "action": "add" },
    ];
    expectedNumbers = [
      { "value": 10, "action": "add", secondValue: testAddValue },
      { "value": 20, "action": "multiply", secondValue: testMultiplyValue },
      { "value": 30, "action": "multiply", secondValue: testMultiplyValue },
      { "value": 40, "action": "add", secondValue: testAddValue },
    ];
  
    apiServiceSpy = jasmine.createSpyObj('ApiService', [ 'fetchNumbers', 'fetchAction' ]);
    apiServiceSpy.fetchNumbers.and.returnValue(of(testNumbers));
    apiServiceSpy.fetchAction
      .withArgs('add').and.returnValue(of({ value: testAddValue }))
      .withArgs('multiply').and.returnValue(of({ value: testMultiplyValue }));

    await TestBed.configureTestingModule({
      declarations: [ AppComponent, ActionPipe ],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should call "fetchNumbers"`, () => {
    expect(apiServiceSpy.fetchNumbers).toHaveBeenCalled()
  });

  it(`should call "fetchAction"`, () => {
    expect(apiServiceSpy.fetchAction).toHaveBeenCalledWith('add')
    expect(apiServiceSpy.fetchAction).toHaveBeenCalledWith('multiply')
  });

  it(`should fetch the numbers with their respective action value`, () => {
    expect(fixture.componentInstance.numbers).toEqual(expectedNumbers);
  });

});
