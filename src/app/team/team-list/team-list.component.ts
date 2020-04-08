import { Component, OnInit } from '@angular/core';
import { BattleService } from 'src/app/battle-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  loading = true;
  teams;
  displayedColumns: string[] = ['teamName', 'totalElos', 'updatedAt'];
  constructor( private battleService: BattleService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.battleService.getAllTeams().subscribe(
      res => {
        this.teams = res;
        this.loading = false;
      },
      err => {
        this.teams = [];
        this.loading = false;
      }
    );

  }
  addTeam(){
    this.router.navigate(['/team/create']);
  }

}
