import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UsersService } from './users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;
  tasks: { id: number, taskId: number, title: string }[];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.tasks = this.usersService.getTasks().filter(task => task.id === this.id);
        }
      );
    this.usersService.taskChanged.subscribe(
      (tasks: { id: number, taskId: number, title: string }[]) => {
        this.tasks = tasks.filter(task => task.id === this.id);
      }
    );
  }

  changeTaskTitle(taskId: number) {
    this.usersService.changeTaskTitle(this.id, taskId);
  }

}
