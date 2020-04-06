import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BattleService } from 'src/app/battle-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss']
})
export class TeamCreateComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private battleService: BattleService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      teamName: ['', [Validators.required]],
    });
  }
  createTeam() {
    this.battleService.createTeam(this.myForm.value).subscribe(
      (res) => {
        console.log(res);
        this.snackBar.open('Successfully Created', 'Dismiss', {
          duration: 2000,
          panelClass: 'primary-bg'
        });
      },
      (err) => [
        this.snackBar.open('Team may already exist', 'Dismiss', {
          duration: 2000,
          panelClass: 'warning-bg'
        })
      ]
    );
  }

}
