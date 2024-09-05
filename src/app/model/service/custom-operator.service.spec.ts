import { TestBed } from '@angular/core/testing';

import { CustomOperatorService } from './custom-operator.service';
import { of } from 'rxjs';

describe('CustomOperatorService', () => {
  let service: CustomOperatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomOperatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should multiply each number in the observable by the given multiplier', (done) => {
    const service = new CustomOperatorService();
    const source$ = of([1, 2, 3]);
    const result$ = source$.pipe(service.multiplyBy(2));

    result$.subscribe(result => {
      expect(result).toEqual([2, 4, 6]);
      done();
    });
  });

  it('should handle an empty array without errors', (done) => {
    const service = new CustomOperatorService();
    const source$ = of([]);
    const result$ = source$.pipe(service.multiplyBy(2));

    result$.subscribe(result => {
      expect(result).toEqual([]);
      done();
    });
  });

  it('should multiply each number in the observable by the given multiplier', (done) => {
    const service = new CustomOperatorService();
    const source$ = of([1, 2, 3]);
    const result$ = source$.pipe(service.multiplyBy(2));

    result$.subscribe(result => {
      expect(result).toEqual([2, 4, 6]);
      done();
    });
  });
});
