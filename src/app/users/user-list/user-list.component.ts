import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BattleService } from 'src/app/battle-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loading = true;
  users;
  displayedColumns: string[] = ['#', 'firstName', 'lastName', 'userName', 'HER', 'team', 'updatedAt', 'action'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private http: BattleService,
    private snackBar: MatSnackBar,
    private router: Router) {
    const user = JSON.parse(localStorage.getItem('token'));
    if (!user) {
      this.displayedColumns.pop();
    } else {
      this.displayedColumns.splice(3, 0, 'phoneNumber');
      this.displayedColumns.splice(7, 0, 'paymentStatus');
      // this.displayedColumns.unshift('#');
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.getAllUsers()
      .subscribe((res: any) => {
        this.users = new MatTableDataSource(res);
        this.users.sort = this.sort;
        this.users.paginator = this.paginator;
        this.loading = false;
      },
        (err) => {
          this.users.data = [];
          this.loading = false;
        }
      );
  }

  addUser() {
    this.router.navigate(['/create']);
  }
  delete(row) {
    console.log(row);
    this.http.deleteUser(row.id).subscribe(res => {
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
      this.ngOnInit();
    });
  }
  export(){

  }
}
