import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BattleService } from 'src/app/battle-service.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss']
})
export class TeamCreateComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private battleService: BattleService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      teamName: ['', [Validators.required]],
    });
  }
  createTeam() {
    this.battleService.createTeam(this.myForm.value).subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

}
