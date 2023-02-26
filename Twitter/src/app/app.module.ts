import { SideComponent } from './Components/side/side.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './Services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FollowRecommendationsComponent } from './Components/follow-recommendations/follow-recommendations.component';
import { TrendsRecommendationComponent } from './Components/trends-recommendation/trends-recommendation.component';
import { HomeComponent } from './Components/home/home.component';
import { ConnectComponent } from './Components/connect/connect.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ExploreComponent } from './Components/explore/explore.component';
import { ExploreoutComponent } from './Components/exploreout/exploreout.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { SearchComponent } from './Components/search/search.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MessagePopupComponent } from './Components/message-popup/message-popup.component';
import { StickyHeaderHomeComponent } from './Components/sticky-header-home/sticky-header-home.component';
import { StickyHeaderPagesComponent } from './Components/sticky-header-pages/sticky-header-pages.component';
import { TweetComponent } from './Components/tweet/tweet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookmarksComponent } from './Components/bookmarks/bookmarks.component';
import { HumanNumbersPipe } from './Pipes/human-numbers.pipe';
import { HumanDatesPipe } from './Pipes/human-dates.pipe';
import { HashtagPipe } from './Pipes/hashtag.pipe';
import { NewMessageComponent } from './Components/new-message/new-message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './Components/modal/modal.component';
import { RequestResetComponent } from './Components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './Components/password/response-reset/response-reset.component';
import { ConfirmPasswordComponent } from './Components/password/confirm-password/confirm-password.component';
import { WebsitePipe } from './Pipes/website.pipe';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { TweetDetailsComponent } from './Components/tweet-details/tweet-details.component';
import { ReplyComponent } from './Components/reply/reply.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './Components/settings/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    FollowRecommendationsComponent,
    TrendsRecommendationComponent,
    HomeComponent,
    ConnectComponent,
    ProfileComponent,
    ExploreComponent,
    ExploreoutComponent,
    NotificationComponent,
    SettingsComponent,
    SigninComponent,
    SignupComponent,
    MessagesComponent,
    SearchComponent,
    FooterComponent,
    MessagePopupComponent,
    StickyHeaderHomeComponent,
    StickyHeaderPagesComponent,
    TweetComponent,
    BookmarksComponent,
    HumanNumbersPipe,
    HumanDatesPipe,
    NewMessageComponent,
    ModalComponent,
    HashtagPipe,
    SideComponent,
    NewMessageComponent,
    RequestResetComponent,
    ResponseResetComponent,
    ConfirmPasswordComponent,
    WebsitePipe,
    TweetDetailsComponent,
    ReplyComponent,
    EditProfileComponent,
    ChangePasswordComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SocialLoginModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1032393167493-djg4gqrnejak3b4nope9rol5r7j26h97.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1249243529000381')
          }
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
