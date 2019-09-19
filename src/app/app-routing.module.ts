import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: 'src/app/auth/auth.module#AuthModule' },
  { path: 'tasks', loadChildren: 'src/app/tasks/tasks.module#TasksModule', canLoad: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
