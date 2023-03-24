import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private fb:FormBuilder, private http: HttpClient) { }

  readonly baseURL = 'http://localhost:3000/api/tasks/';
  list: Task[] = [];

  taskForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    date: ['', Validators.required],
    priority: ['', Validators.required]
  })

  getTasks() {
    this.http.get(this.baseURL)
      .subscribe(data => {
        this.list = data as Task[];
        // console.log(data);
      })
  }

  postTask(){
    return this.http.post(this.baseURL, this.taskForm.value);
  }

  putTask(){
    return this.http.put(this.baseURL+this.taskForm.get('_id')?.value, this.taskForm.value);
  }

  deleteTask(_id: string){
    return this.http.delete(this.baseURL + _id);
  }
}
