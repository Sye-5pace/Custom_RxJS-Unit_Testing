// Add unit test cases for app component: Task 3

import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { map, Observable } from 'rxjs';
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

  it('should emit transformed values correctly when performing custom operations', () => {
      const customOps = new CustomOperatorService();
      const component = new AppComponent(customOps);
      const consoleSpy = jest.spyOn(console, 'log');
      const errorSpy = jest.spyOn(console, 'error');
      component.performCustomOps();
      expect(consoleSpy).toHaveBeenCalledWith('Custom Operator in action');
      expect(component.transformed).toEqual([2, 18, 8, 20, 0, 16, 14, 6]);
      expect(errorSpy).not.toHaveBeenCalled();
    });
});
