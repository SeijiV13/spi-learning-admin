import { VideoContainerComponent } from './pages/video-container/video-container.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: VideoContainerComponent,
  },
];

export const VideoRoutes = RouterModule.forChild(routes);
