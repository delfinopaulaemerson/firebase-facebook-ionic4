import { AuthGuard } from './../core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    loadChildren: '../task-list/task-list.module#TaskListPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}
