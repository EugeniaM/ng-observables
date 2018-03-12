import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumberObs = Observable.interval(1000);
    this.numberObsSubscription = myNumberObs
      .map(
        (data: number) => {
          return data * 2;
        }
      )
      .subscribe(
      (num: number) => {
        console.log(num);
      }
    );

    const customObs = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('1st data');
      }, 1000);
      setTimeout(() => {
        observer.next('2nd data');
      }, 2000);
      setTimeout(() => {
        observer.complete();
      }, 3000);
      setTimeout(() => {
        observer.next('3d data');
      }, 4000);
    });

    this.customObsSubscription = customObs.subscribe(
      (data: string) => {
        console.log(data);
      },
      (err: string) => {
        console.log(err);
      },
      () => {
        console.log('COMPLETED');
      }
    );
  }

  ngOnDestroy() {
    this.numberObsSubscription.unsubscribe();
    this.customObsSubscription.unsubscribe();
  }

}
