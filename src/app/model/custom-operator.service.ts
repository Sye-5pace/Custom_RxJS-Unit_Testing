import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomOperatorService {

  constructor() { }

  multiplyBy(multiplier: number) {
    return (datastream: Observable<number>)=> datastream.pipe(
      map( value => value * multiplier)
    )
  }

}
