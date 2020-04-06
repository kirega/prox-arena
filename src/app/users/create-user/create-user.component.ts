import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BattleService } from 'src/app/battle-service.service';
import { startWith } from 'rxjs/operators';

@Component( {
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: [ './create-user.component.scss' ]
} )
export class CreateUserComponent implements OnInit {
  myForm: FormGroup;
  filteredOptions = [];
  options;

  constructor(private fb: FormBuilder, private http: BattleService) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group( {
      firstName: [ '', [ Validators.required ] ],
      lastName: [ '' ],
      userName: [ '' ],
      teamId: [ '' ]
    } );
    // fetch all teams;
    this.http.getAllTeams().subscribe(
      res => {
        this.options = res;
        this.filteredOptions = this.options;
      }
    );
    this.myForm.controls['teamId'].valueChanges
      .pipe( startWith( '' ) )
      .subscribe( (value: string = '') => {
        const vals = [];
        // this.filteredOptions = this.options;
        if ( this.options && value.trim().length !== 0) {
          for ( const a of this.options ) {
            if ( a.teamName.toLowerCase().includes( value.toLowerCase().trim() ) ) {
              vals.push(a);
            }
          }
          this.filteredOptions = vals;
        } else{
          this.filteredOptions = this.options;
        }
      });
  }

  createUser() {
    console.log( this.myForm.value );
    this.http.createUser( this.myForm.value ).subscribe(
      res => {
        console.log( res );
      }
    );
  }

  selected(team) {
    console.log( team );
  }
  showTeam(team){
    return team.teamName;
  }
}
