import { Component } from '@angular/core';
import { CustomOperatorService } from './model/service/custom-operator.service';
import { Observable, of } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators'; // Use mergeMap or switchMap
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Custom_RxJs_Operator-Unit_Testing';

  dataObs$ = of([1, 9, 4, 10, 0, 8, 7, 3]);
  transformed: number[]| any = [];

  constructor(private customOps: CustomOperatorService) {}

  ngOnInit() {
    this.performCustomOps();
  }

  performCustomOps() {
    this.dataObs$.pipe(
      tap(() => console.log('Custom Operator in action')),
      this.customOps.multiplyBy(2)
    ).subscribe(value => this.transformed.push(value));
  }
}
