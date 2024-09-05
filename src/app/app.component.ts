import { Component } from '@angular/core';
import { CustomOperatorService } from './model/service/custom-operator.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Custom_RxJs_Operator-Unit_Testing';
  //Task 2: Implement an angular component:
  // In this task, an observable is created to use the custom operator service
  // in the component then display the original version of the observable(dataObs$)
  // then the latest version of the observable(transformed$)
  dataObs$ = of(1,9,4,10,0,8,7,3)
  transformed$! : Observable<number>;

  constructor(private customOps: CustomOperatorService){}

  ngOnInit(){
    
  }



}
