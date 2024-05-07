import { Component, OnInit } from '@angular/core';
import { Sub } from '../models/sub';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit{

  isEmailError: boolean = false;
  isSubscribed: boolean = false;

  constructor(
    private subService: SubscribersService,
    ) {}

  ngOnInit(): void {
      
  }

  onSubmitSub(formValue: any) {
    const subData: Sub = {
      name: formValue.name,
      email: formValue.email,
    }

    this.subService.checkSubs(subData.email).subscribe(val => {
      if (val.empty) {
        this.subService.addSubs(subData);
        this.isSubscribed = true;
      } else {
        this.isEmailError = true;
      }
    })
  }
}
