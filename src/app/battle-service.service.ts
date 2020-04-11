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
  getAllEvents(){
    return this.http.get(`${environment.url}/events`);
  }
  getAllEventResults(id){
    console.log(id);
    return this.http.get(`${environment.url}/results/${id}`);
  }
  createTeam(data){
    return this.http.post(`${environment.url}/teams`, data);
  }
  createEvent(data){
    return this.http.post(`${environment.url}/events`, data);
  }
  createEventResult(data){
    return this.http.post(`${environment.url}/results`, data);
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
