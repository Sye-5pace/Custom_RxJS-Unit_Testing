import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { map, MonoTypeOperatorFunction, Observable, of, tap } from 'rxjs';
import { CustomOperatorService } from './model/service/custom-operator.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Custom_RxJs_Operator-Unit_Testing' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Custom_RxJs_Operator-Unit_Testing');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Custom_RxJs_Operator-Unit_Testing');
  });

  it('should perform custom operations on data observable', () => {
    const customOps = new CustomOperatorService();
    const component = new AppComponent(customOps);
    const consoleSpy = jest.spyOn(console, 'log');
    const customOpsSpy = jest.spyOn(customOps, 'multiplyBy').mockReturnValue((datastream: Observable<number[]>) => datastream.pipe(
      map(values => values.map((value: number) => typeof value === 'number' ? value * 2 : value))
    ));
    const errorSpy = jest.spyOn(console, 'error');
    const subscriptionSpy = jest.spyOn(component.subscription, 'unsubscribe');

    component.ngOnInit();
    component.performCustomOps();

    expect(consoleSpy).toHaveBeenCalledWith('Custom Operator in action');
    expect(customOpsSpy).toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
    expect(subscriptionSpy).not.toHaveBeenCalled();
  });

  it('should multiply each value by 2 when dataObs$ emits values', () => {
    const customOperatorService = {
      multiplyBy: jest.fn().mockReturnValue((source: { pipe: (arg0: MonoTypeOperatorFunction<unknown>) => any; }) => source.pipe(tap(value => value * 2)))
    };
    const component = new AppComponent(customOperatorService);
    component.dataObs$ = of(1, 2, 3);
    component.transformed = [];

    component.performCustomOps();

    expect(component.transformed).toEqual([2, 4, 6]);
  });
});
