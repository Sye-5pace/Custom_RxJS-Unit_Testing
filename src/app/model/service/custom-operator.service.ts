import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomOperatorService {

  constructor() { }

  // Task 1: Create a Custom RxJs operator
  // This method represents a custom RxJs operator named: multiplyBy()
  // It's uses the pipe operator that allows chaining
  // of operators with source or inner observables, then uses the map operator
  // to go through each emitted value from the source observable then transforms
  //  per the operation within the map operator.In this case,
  // Multiply each emitted value from the source observable
  //  by the argument(value) passed as the parameter to custom operator
  // Also this operator ignore the emitted value if is not a number
  multiplyBy(multiplier: number) {
    return (datastream: Observable<number[]>) => datastream.pipe(
      map(values => values.map(value => typeof value === 'number' ? value * multiplier : value))
    );
  }

}
