import { Component } from '@angular/core';
import { CustomOperatorService } from './model/service/custom-operator.service';
import { of, Subscription } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
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

  dataObs$: any = of([1, 9, 4, 10, 0, 8, 7, 3]);
  transformed: number[]| any = [];

  public subscription!: Subscription

  constructor(private customOps: CustomOperatorService) {}

  ngOnInit() {
    this.performCustomOps();
  }

  performCustomOps() {
    this.dataObs$.pipe(
      tap(() => console.log('Custom Operator in action')),
      this.customOps.multiplyBy(2),
      catchError(err => {
        console.error('Error occurred:', err);
        return of([]);
      })
    ).subscribe((value: any) => this.transformed.push(value));
  }

  //Attaching RxJs best practice
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
