import { Component, OnInit } from '@angular/core';
import { BattleService } from 'src/app/battle-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  loading = true;
  teams;
  teamDetail;
  displayedColumns: string[] = ['teamName', 'totalElos', 'updatedAt', 'action'];
  constructor( private battleService: BattleService,
               private snackBar: MatSnackBar,
               private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('token'));
    if (!user){
      this.displayedColumns.pop();
    }
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

  clickableRow(row: any) {
    console.log(row);
    this.battleService.getTeamDetails(row.id).subscribe(
      res => {
        this.teamDetail = res;
        console.log(res);
      }
    );
  }

  delete(element: any) {
    this.battleService.deleteTeam(element.id).subscribe(
      res => {
        this.snackBar.open('Team has been deleted', 'Dismiss', {
          duration: 2000,
          panelClass: 'warning-bg'
        });
        this.ngOnInit();
      }
    );
  }
}
