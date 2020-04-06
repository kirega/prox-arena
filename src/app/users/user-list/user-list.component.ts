import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BattleService } from 'src/app/battle-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loading = true;
  users;
  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'HER'];

  constructor(private http: BattleService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.http.getAllUsers()
    .subscribe(res => {
      this.users = res;
      this.loading = false;
    },
    (err) => {
      this.loading = false;
    }
    );
  }

  addUser(){
    this.router.navigate(['/create']);
  }

}
