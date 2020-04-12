import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BattleService } from 'src/app/battle-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EventCreateComponent } from 'src/app/events/event-create/event-create.component';
import { EventResultsComponent } from 'src/app/events/event-results/event-results.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
  loading = true;
  users;
  displayedColumns: string[] = ['#', 'firstName', 'lastName', 'userName', 'her', 'aggregated', 'team', 'updatedAt', 'action'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private http: BattleService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
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
        this.cd.detectChanges();
      },
        (err) => {
          this.users = new MatTableDataSource([]);
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
  // aggregated(EventResult){
  //    const res = EventResult.reduce((acc, v) => acc + v.result, 0);
  //    console.log(res);
  //    return res;
  // }
  addResults(element){
    const dialogRef = this.dialog.open(EventResultsComponent, {
      width: '400px',
      data: {...element, typeAction: 'create'}
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log('done');
    });
    this.ngOnInit();
  }
  export(){

  }
  sync(){
    this.http.manualHERUpdate().subscribe(
      res => {
        this.snackBar.open('Successfully Updated HER for all users', 'Dismiss', {
          duration: 2000,
          panelClass: 'primary-bg'
        });
      }
    );
  }
}
