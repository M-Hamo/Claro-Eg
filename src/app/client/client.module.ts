import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { ClientRoutingModule } from './client-routing.module';
import { ClientLayoutComponent } from './client-layout.component';

// Grid
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

// Home page
import { HomeComponent } from './pages/home/home.component';
import { ResidentialComponent } from './pages/home/filteration-dropdown/residential/residential.component';
import { NonResidentialComponent } from './pages/home/filteration-dropdown/non-residential/non-residential.component';
import { ClaroItemComponent } from './pages/home/claro-item/claro-item.component';
import { SearchNotFoundComponent } from './pages/home/search-not-found/search-not-found.component';
import { SocialDialogComponent } from './social-dialog/social-dialog.component';

// Profile settings
import { ProfileComponent } from './pages/profile/profile.component';
import { SideNavComponent } from './pages/profile/side-nav/side-nav.component';
import { ProfileSettingsComponent } from './pages/profile/profile-content-pages/profile-settings/profile-settings.component';
import { FavoritesComponent } from './pages/profile/profile-content-pages/favorites/favorites.component';

// Add && View
import { PostsComponent } from './pages/posts/posts.component';
import { ViewComponent } from './pages/view/view.component';
import { ChatComponent } from './pages/profile/profile-content-pages/chat/chat.component';
import { CommonQuestionsComponent } from './pages/common-questions/common-questions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { MapDialogComponent } from './pages/view/map-dialog/map-dialog.component';

@NgModule({
  declarations: [
    ClientLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SocialDialogComponent,
    ResidentialComponent,
    NonResidentialComponent,
    ClaroItemComponent,
    SearchNotFoundComponent,
    ProfileComponent,
    ProfileSettingsComponent,
    FavoritesComponent,
    SideNavComponent,
    PostsComponent,
    ViewComponent,
    MapDialogComponent,
    ChatComponent,
    CommonQuestionsComponent,
    PrivacyPolicyComponent,
  ],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
  providers: [...ClientRoutingModule.resolvers],
})
export class ClientModule {}
