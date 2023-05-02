import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL!: string

  constructor(private http: HttpClient) { 
    this.serviceURL = 'http://localhost:3000/task'
  }

  getTasks$ = this.http.get<Task[]>(this.serviceURL).pipe(
    shareReplay(1)
  )

  // Adding the task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL, task)
  }

  // fetching all tasks
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL)
  }

  // deleting a task
  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.serviceURL + `/${task.id}`)
  }

  // editing the task
  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.serviceURL + `/${task.id}`, task)
  }

}
