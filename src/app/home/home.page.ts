import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Employee } from '../employee';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  employees: Employee[] = [];

  constructor(
    public api: ApiService,
    public loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute) {}

    async getEmployees() {
      const loading = await this.loadingController.create({
        message: 'Loading...'
      });
      await loading.present();
      await this.api.getEmployees()
      .subscribe(res => {
        this.employees = res;
        console.log(this.employees);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
    });
  }
  ngOnInit() {
    this.getEmployees();
  }
  addEmployee() {
   this.router.navigate(['/employee-add']);
 }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.employees, event.previousIndex, event.currentIndex);
  }
}
