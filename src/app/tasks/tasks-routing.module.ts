import { AuthGuard } from './../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: ' ',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ' ',
        loadChildren: './pages/task-list/tasks-list.module#TasksListPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
