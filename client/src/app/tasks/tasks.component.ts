import {Component, OnInit} from '@angular/core';
import {TaskService} from "../shared/task.service";
import {Task} from "../shared/task.model";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: [
  ]
})


export class TasksComponent implements OnInit{

  constructor(public service: TaskService, private toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.service.getTasks();
  }


  populateForm(selectorRecord:Task){
    this.service.taskForm.setValue({
      _id : selectorRecord._id,
      name : selectorRecord.name,
      date : selectorRecord.date,
      priority : selectorRecord.priority
    })
  }


  onDelete(_id: string) {
    if(confirm ('Are you sure to delete the Task?')){
      this.service.deleteTask(_id).subscribe(res => {
        this.service.getTasks();
        this.toastr.error('Task Deleted')
      })
    }
  }
}
