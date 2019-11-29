import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.page.html',
  styleUrls: ['./employee-detail.page.scss'],
})
export class EmployeeDetailPage implements OnInit {

  employee: Employee = { _id: null, name: '', email: '', desgination: null, phoneNumber: null };
  isLoadingResults = false;

  constructor(
    public api: ApiService,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router) { }

  ngOnInit() {
    this.getEmployee();
  }
  async getEmployee() {
  if (this.route.snapshot.paramMap.get('id') === 'null') {
    this.presentAlertConfirm('You are not choosing an item from the list');
  } else {
    this.isLoadingResults = true;
    await this.api.getEmployee(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.employee = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
async presentAlertConfirm(msg: string) {
  const alert = await this.alertController.create({
    header: 'Warning!',
    message: msg,
    buttons: [
      {
        text: 'Okay',
        handler: () => {
          this.router.navigate(['']);
        }
      }
    ]
  });

  await alert.present();
}
async deleteEmployee(id: any) {
  this.isLoadingResults = true;
  await this.api.deleteEmployee(id)
    .subscribe(res => {
      this.isLoadingResults = false;
      this.router.navigate([ '/home' ]);
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
}
editEmployee(id: any) {
  this.router.navigate([ '/employee-edit/', id ]);
}
}
