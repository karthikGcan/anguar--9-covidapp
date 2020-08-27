import { Component, OnInit } from '@angular/core';
import{Router}from '@angular/router';
import { ApiService } from '../api.service';
import{FormGroup,FormControl,FormBuilder,FormGroupDirective,NgForm,Validators}from '@angular/forms';
import{ErrorStateMatcher}from '@angular/material/core';



export class  MyErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null,form : FormGroupDirective | NgForm |null): boolean{
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
} 

@Component({
  selector: 'app-add-cases',
  templateUrl: './add-cases.component.html',
  styleUrls: ['./add-cases.component.scss']
})
export class AddCasesComponent  implements OnInit {
   casesForm: FormGroup;
  name = '';
  gender = '';
  age: number = null;
  address = '';
  city = '';
  country = '';
  status = '';
  statusList = ['Positive', 'Dead', 'Recovered','Danger'];
  genderList = ['Male', 'Female'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();


  constructor(private router: Router,private api : ApiService ,private formbuilder : FormBuilder) { }

  ngOnInit(): void {
    this.casesForm = this.formbuilder.group({
      name : [null,Validators.required],
      gender : [null, Validators.required],
      age : [null, Validators.required],
      address : [null, Validators.required],
      city : [null, Validators.required],
      country : [null, Validators.required],
      status : [null, Validators.required]
  

    })
  }
  onFormSubmit(){
    this.isLoadingResults=true;
    this.api.addCases(this.casesForm.value).subscribe((res:any)=>{
      const id = res.id;
      this.isLoadingResults=false;
      this.router.navigate(['/cases-details',id])
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}

