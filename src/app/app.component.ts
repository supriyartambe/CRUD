import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { form_detail } from './form_detail';
import { ServicesService } from './services.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD';
  formAdd! : FormGroup;

  personData! : any;

  pModuleobj: form_detail = new form_detail();

  showAdd! : boolean;
  showUpdate! : boolean;

  
  constructor(private services:ServicesService, private formbuilder: FormBuilder ,private toastr:ToastrService){}
  
  ngOnInit():void {
    this.formAdd = this.formbuilder.group({
       name: [''],
       email: [''],
       dob: [''],
       avtar: [''],
       country:['']
    }),
    this.getPersonRecord();
    
  }
    clickAddPerson(){
      this.formAdd.reset();
      this.showAdd = true;
      this.showUpdate = false;

    }
  //Add person record
  createPersonRecord(){

    this.pModuleobj.name=this.formAdd.value.name;
    this.pModuleobj.email=this.formAdd.value.email;
    this.pModuleobj.dob=this.formAdd.value.dob;
    this.pModuleobj.avtar=this.formAdd.value.avtar;
    this.pModuleobj.country=this.formAdd.value.country;
     this.services.createPersonDetails(this.pModuleobj).subscribe((res=>
      {
       console.log(res);
      this.toastr.success("add Successfully");
      let ref = document.getElementById("#exampleModalCenter")
      ref?.click();
      this.formAdd.reset();
      this.getPersonRecord();
  
      }))
      

  }


getPersonRecord()
{
  this.services.getPerson().subscribe((res=>
    {
    this.personData=res;

    }))
}
deleteRecord(person :any)
{
  this.services.deletePersonrecords(person).subscribe((res=>
    {
      let refdelete = document.getElementById("#exampleModalLong")
      refdelete?.click();
      
      this.toastr.error("Delete Suiccessfully");
      this.getPersonRecord();
    }
    ))
}
updateRecord(person:any, id:number)
{
this.services.updatePersonrecords(person,id).subscribe((res=>
  {
    this.toastr.info("Update Successfully");
  }
  ))
}

onUpdate(person : any)
{
  this.showUpdate = true;
  this.showAdd = false;
  this.pModuleobj.id = person.id;
  this.formAdd.controls['name'].setValue(person.name);
  this.formAdd.controls['email'].setValue(person.email);
  this.formAdd.controls['dob'].setValue(person.dob);
  this.formAdd.controls['avtar'].setValue(person.avtar);
  this.formAdd.controls['country'].setValue(person.country);
}


updatePersonDetails(){
  this.pModuleobj.name = this.formAdd.value.name;
  this.pModuleobj.email = this.formAdd.value.email;
  this.pModuleobj.dob = this.formAdd.value.dob;
  this.pModuleobj.avtar = this.formAdd.value.avtar;
  this.pModuleobj.country = this.formAdd.value.country;

  this.services.updatePersonrecords(this.pModuleobj,this.pModuleobj.id).subscribe(res=>{
    alert("Update Successfully");
    let ref = document.getElementById("#exampleModalCenter")
    ref?.click();
    this.formAdd.reset();
    this.getPersonRecord();
  })

}

}



