import { Component } from '@angular/core';
import {TaskService} from "../../shared/task.service";
import {Task} from "../../shared/task.model";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styles: [
  ]
})


export class TaskFormComponent {
  submitted: boolean = false;
  constructor(public service:TaskService, private toastr:ToastrService) {
  }


  onSubmit(){
    this.submitted = true;
    if(this.service.taskForm.valid) {
      //debugger;
       // console.log(this.service.taskForm.value);
      if(this.service.taskForm.get('_id')?.value=='')
        this.service.postTask().subscribe(res => {
          // console.log('got the response');
          this.service.getTasks();
          this.toastr.success('Task Added')
          this.resetForm();
        })
      else
        this.service.putTask().subscribe(res => {
          this.service.getTasks();
          this.toastr.info('Task Updated')
          this.resetForm();
        })
    }
  }

  resetForm(){
    this.service.taskForm.reset();
    this.submitted = false;
  }

}
