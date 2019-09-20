import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: '../login/auth.module#AuthModule' },
  { path: 'task-list', loadChildren: './task-list/task.module#TaskModule', canLoad: [AuthGuard] },
  { path: 'task-save', loadChildren: './task-save/task-save.module#TaskSavePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
