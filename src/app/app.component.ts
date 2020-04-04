import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'team-battles';
  userNames = [];
  user;
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    const headers: HttpHeaders = new HttpHeaders({
      Accept: 'application/vnd.lichess.v2+json',
    })
    this.http.get('https://cors-anywhere.herokuapp.com/https://lichess.org/@/kirega/perf/blitz', { headers })
      .subscribe(
        (res: any) => {
          console.log(res);
          console.log(res.stat.highest.int);
        }
      );
  }
}
