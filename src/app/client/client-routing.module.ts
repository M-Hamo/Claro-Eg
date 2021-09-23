import { ClientLayoutComponent } from './client-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileSettingsComponent } from './pages/profile/profile-content-pages/profile-settings/profile-settings.component';
import { FavoritesComponent } from './pages/profile/profile-content-pages/favorites/favorites.component';
import { ChatComponent } from './pages/profile/profile-content-pages/chat/chat.component';

import { PostsComponent } from './pages/posts/posts.component';
import { ViewComponent } from './pages/view/view.component';

import { CommonQuestionsComponent } from './pages/common-questions/common-questions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { AuthorizeGuard } from '@core/auth';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthorizeGuard],
        children: [
          { path: 'favorites', component: FavoritesComponent },
          { path: 'conversation', component: ChatComponent },
          { path: '', component: ProfileSettingsComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            canActivate: [AuthorizeGuard],
            component: PostsComponent,
            pathMatch: 'full',
          },
          {
            path: ':perma',
            component: ViewComponent,
          },
        ],
      },
      {
        path: 'common-questions',
        component: CommonQuestionsComponent,
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },

      { path: '**', redirectTo: '404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
  static resolvers = [];
}
