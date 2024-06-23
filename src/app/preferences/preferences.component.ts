import {  Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css', '../app.component.css']
})
export class PreferencesComponent implements OnInit{ 
  constructor(private builder:FormBuilder, private toastr: ToastrService){}

  ngOnInit(){
    this.loadPreferences();
  }

  preferenceform=this.builder.group({
    ufos: this.builder.control('1', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(1)])),
    time: this.builder.control('60', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(3)])),
  });

  savePreferences(){
    if(this.preferenceform.valid){
      sessionStorage.setItem('ufos',  this.preferenceform.value.ufos || '1');
      sessionStorage.setItem('time', this.preferenceform.value.time || '60');
      console.log('preferences saved');
      this.toastr.success("Preferences saved.");
    }
  }

  loadPreferences(){
    if(sessionStorage.getItem('ufos') && sessionStorage.getItem('time')){
      this.preferenceform.controls['time'].setValue(sessionStorage.getItem('time'));
      this.preferenceform.controls['ufos'].setValue(sessionStorage.getItem('ufos'));
    }
  }
}