import { SharedModule } from 'src/app/shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { TaskItemComponent } from './task-item.component';

@NgModule({
  declarations: [TaskItemComponent],
  imports: [SharedModule],
  exports: [TaskItemComponent]
})
export class ComponentsModule {}
