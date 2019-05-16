import { Component } from '@angular/core';
import $ from 'jquery'
import { ConnectBackendService } from 'src/app/services/connect-backend.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.scss']
})
export class CPanelComponent {

  constructor(private http: ConnectBackendService) { }


  
  myImage = null

  /**
   * 
   * @param $event this is the object 
   * of the event of the submition
   * 
   * make some validation for submitted image file 
   */
  onSelectImage($event){
    this.myImage = $event.target
    if(this.myImage.files[0].type == "image/jpeg" || this.myImage.files[0].type == "image/png"){
    } else {
      alert(`معذرة .. الملف الذي قمت بإختياره ليس صورة أو أنها صورة ذات امتداد غير مدعوم`)
      this.myImage.value = ""

      // make the image directive value is "" and so that 
      // we disable the submit button
      this.image.setValue('')
    }
  }
  
  onSubmit(){
    $('.modal').fadeIn(600)
    let formData = new FormData(document.forms[0])
    this.http.uploadFile(formData).subscribe(
      result => {
        // this.Message = `<div class="bg-success">Hello</div>`;
        $('.modal').fadeOut(600)
      },
      error => {
        console.log(error)
        alert(error.error.message)
      }
    )
  }


  /**
   * this variable has an instance of the authenticated user
   */
  User = {
    firstname : localStorage.firstname,
    lastname: localStorage.lastname,
    id: localStorage.id
  }

  Message: string;


  /**
   * Validate the form of uploading product Images
   */
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('إختر القسم', Validators.required),
    material: new FormControl('إختر الخامة', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', [Validators.required])
  })

  get name(){
    return this.form.get('name');
  }

  get price(){
    return this.form.get('price');
  }

  get category(){
    return this.form.get('category');
  }
  
  get material(){
    return this.form.get('material')
  }

  get image(){
    return this.form.get('image');
  }
}
