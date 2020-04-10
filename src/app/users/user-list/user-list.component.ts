import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BattleService } from 'src/app/battle-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loading = true;
  users;
  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'HER', 'team' ,'updatedAt', 'action'];

  constructor(
    private http: BattleService, 
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('token'));
    if (!user){
      this.displayedColumns.pop();
    } else {
      this.displayedColumns.unshift('phoneNumber');
      this.displayedColumns.unshift('paymentStatus');
    }
    this.loading = true;
    this.http.getAllUsers()
    .subscribe(res => {
      this.users = res;
      this.loading = false;
    },
    (err) => {
      this.users = [];
      this.loading = false;
    }
    );
  }

  addUser(){
    this.router.navigate(['/create']);
  }
  delete(row){
    console.log(row);
    this.http.deleteUser(row.id).subscribe( res => {
      console.log(res);
      this.ngOnInit();
    });
  }
  paymentStatus(element) {
    this.http.updatePayment(element.id).subscribe(res => {
      this.snackBar.open('Payment Status updated', 'Dismiss', {
        duration: 2000,
        panelClass: 'primary-bg'
      });
    });
  }
}
