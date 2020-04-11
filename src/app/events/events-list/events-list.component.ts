import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BattleService } from 'src/app/battle-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  loading = true;
  events;
  displayedColumns: string[] = ['#', 'name', 'dateOfEvent', 'action'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private http: BattleService,
    private snackBar: MatSnackBar,
    private router: Router) {
    // const user = JSON.parse(localStorage.getItem('token'));
    // if (!user) {
    //   this.displayedColumns.pop();
    // } else {
    //   this.displayedColumns.splice(3, 0, 'phoneNumber');
    //   this.displayedColumns.splice(7, 0, 'paymentStatus');
    //   // this.displayedColumns.unshift('#');
    // }
  }

  ngOnInit(): void {
    this.loading = true;
    this.http.getAllEvents()
      .subscribe((res: any) => {
        this.events = new MatTableDataSource(res);
        this.events.sort = this.sort;
        this.events.paginator = this.paginator;
        this.loading = false;
      },
        (err) => {
          this.events.data = [];
          this.loading = false;
        }
      );
  }
  addEvent(){
    this.router.navigate(['/event/create']);
  }
  delete(row){

  }
  showDetail(row){
    console.log(row);
    this.router.navigate([`/results/${row.id}`]);
  }
}
