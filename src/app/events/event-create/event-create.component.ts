import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BattleService } from 'src/app/battle-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: BattleService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      dateOfEvent: [''],
      tournamentId: ['']
    });
  }
  createEvent() {
    let data = this.myForm.value;
 
    this.http.createEvent(data).subscribe(
      res => {
        this.snackBar.open('Successfully Created', 'Dismiss', {
          duration: 2000,
          panelClass: 'primary-bg'
        });
        this.myForm.reset({}, {emitEvent: false});
        console.log( res );
        this.router.navigate(['/events']);
      },
      error => {
        console.log(error);
        this.snackBar.open(error.error.error, 'Dismiss', {
          duration: 2000,
          panelClass: 'warning-bg'
        });
      }
    );
  }
}
