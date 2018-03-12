import { Subject } from 'rxjs/Subject';

export class UsersService {
  usersTasks = [
    {
      id: 1,
      taskId: 1,
      title: 'User 1 task 1'
    },
    {
      id: 1,
      taskId: 2,
      title: 'User 1 task 2'
    },
    {
      id: 2,
      taskId: 1,
      title: 'User 2 task 1'
    },
    {
      id: 2,
      taskId: 2,
      title: 'User 2 task 2'
    }
  ];
  taskChanged = new Subject<{id: number, taskId: number, title: string}[]>();

  getTasks() {
    return [... this.usersTasks];
  }

  changeTaskTitle(userId: number, taskId: number) {
    const index = this.usersTasks.findIndex(elem => elem.id === userId && elem.taskId === taskId);
    this.usersTasks.splice(index, 1, {...this.usersTasks[index], title: 'NEW TITLE'});
    this.taskChanged.next([...this.usersTasks]);
  }
}
