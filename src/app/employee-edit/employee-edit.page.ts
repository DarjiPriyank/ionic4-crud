import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.page.html',
  styleUrls: ['./employee-edit.page.scss'],
})
export class EmployeeEditPage implements OnInit {

  employeeForm: FormGroup;
  id = '';
  name = '';
  email = '';
  designation = '';
  phoneNumber: number = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
  private route: ActivatedRoute,
  private api: ApiService,
  private fb: FormBuilder) { }

  ngOnInit() {
    this.getEmployee(this.route.snapshot.params['id']);
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  getEmployee(id: any) {
  this.api.getEmployee(id).subscribe((data: any) => {
    this._id = data._id;
    this.employeeForm.setValue({
      name: data.name,
      email: data.email,
      designation: data.designation,
      phoneNumber: data.phoneNumber
    });
  });
}

onFormSubmit() {
  this.isLoadingResults = true;
  this.api.updateEmployee(this._id, this.employeeForm.value)
    .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/employee-detail', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
}
employeeDetails() {
  this.router.navigate(['/employee-detail', this._id]);
}

}
