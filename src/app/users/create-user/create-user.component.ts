import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BattleService } from 'src/app/battle-service.service';
import { startWith, map } from 'rxjs/operators';

@Component( {
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: [ './create-user.component.scss' ]
} )
export class CreateUserComponent implements OnInit {
  myForm: FormGroup;
  filteredOptions = [];
  options;
  teamId;

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
      .pipe(
        startWith( '' ),
        map( value => typeof value === 'string' ? value : value.teamName )
      )
      .subscribe( (value: string = '') => {
        const vals = [];
        // this.filteredOptions = this.options;
        if ( this.options && value.trim().length !== 0 ) {
          for ( const a of this.options ) {
            if ( a.teamName.toLowerCase().includes( value.toLowerCase().trim() ) ) {
              vals.push( a );
            }
          }
          this.filteredOptions = vals;
        } else {
          this.filteredOptions = this.options;
        }
      } );
  }

  createUser() {
    let data = this.myForm.value;
    data = {
      ...data,
      teamId: this.teamId
    };
    this.http.createUser(data).subscribe(
      res => {
        console.log( res );
      }
    );
  }

  selected(team) {
    this.teamId = team.option.value.id;
  }

  showTeam(team): string {
    return team && team.teamName ? team.teamName : '';
  }
}
