import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BattleService } from 'src/app/battle-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EventResultsComponent } from '../event-results/event-results.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-results-list',
  templateUrl: './event-results-list.component.html',
  styleUrls: ['./event-results-list.component.scss']
})
export class EventResultsListComponent implements OnInit {
  loading = true;
  events;
  displayedColumns: string[] = ['#', 'player', 'result', 'action'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private http: BattleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const eventId = this.route.snapshot.params['id'];
    this.http.getAllEventResults(eventId)
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
  editResult(row) {
    const dialogRef = this.dialog.open(EventResultsComponent, {
      width: '400px',
      data: {...row, typeAction: 'edit'}
    });
    dialogRef.afterClosed().subscribe( () => {
      this.ngOnInit();
    });
  }
  delete(row){
    this.http.deleteResult(row.UserId, row.EventId).subscribe( res => {
      this.snackBar.open('Successfully Delete', 'Dismiss', {
        duration: 2000,
        panelClass: 'primary-bg'
      });
      this.ngOnInit();
    });
  }
}
