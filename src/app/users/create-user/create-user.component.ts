import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BattleService } from 'src/app/battle-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private http: BattleService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      userName: [''],
      teamId: ['']
    });
  }
  createUser() {
    console.log(this.myForm.value);
    this.http.createUser(this.myForm.value).subscribe(
      res => {
        console.log(res);
      }
    );
  }

}
