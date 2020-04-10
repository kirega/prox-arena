import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(private http: HttpClient) { }

  createUser(data){
    return this.http.post(`${environment.url}/users`, data);
  }
  getAllUsers(){
    return this.http.get(`${environment.url}/users`);
  }
  getAllTeams(){
    return this.http.get(`${environment.url}/teams`);
  }
  getTeamDetails(id){
    return this.http.get(`${environment.url}/teams/detail/${id}`);
  }
  createTeam(data){
    return this.http.post(`${environment.url}/teams`, data);
  }
  deleteUser(id){
    return this.http.delete(`${environment.url}/users/${id}`);
  }
  deleteTeam(id){
    return this.http.delete(`${environment.url}/teams/${id}`);
  }
  updatePayment(id){
    return this.http.put(`${environment.url}/users/updatePayment/${id}`, {});
  }
}
