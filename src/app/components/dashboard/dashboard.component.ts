import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObject: Task = new Task()
  taskArr!: Task[]

  addTaskValue: string = ''

  editTaskValue: string = ''

  constructor(private crudService: CrudService) { }

  tasks$ = this.crudService.getTasks$

  ngOnInit(): void {
    this.editTaskValue = ''
    this.addTaskValue = ''
    this.taskObject = new Task()
    this.taskArr = []
    this.getAllTasks() 
  }

  addTask() {
    this.taskObject.task_name = this.addTaskValue
    this.crudService.addTask(this.taskObject).subscribe({
      next: (res) => {
        this.ngOnInit()
        this.addTaskValue = ''
      },
      error: (err) => {
        alert("Failed to app task!")
      }
    })
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe({
      next: (res) => {
        this.taskArr = res
      },
      error: (err) => {
        alert("Failed to get tasks!")
      }
    })
  }

  editTask() {
    this.taskObject.task_name = this.editTaskValue
    this.crudService.editTask(this.taskObject).subscribe({
      next: (res) => {
        this.ngOnInit()
      },
      error: (err) => {
        alert("Failed to edit task!")
      }
    })
  }

  deleteTask(eTask: Task) {
    this.crudService.deleteTask(eTask).subscribe({
      next: (res) => {
        this.ngOnInit()
      },
      error: (err) => {
        alert("Failed to delete task!")
      }
    })
  }

  call(eTask: Task) {
    this.taskObject = eTask
    this.editTaskValue = eTask.task_name
  }

}
