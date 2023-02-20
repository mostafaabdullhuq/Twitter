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
import { FormsModule } from '@angular/forms';
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
import { WebsitePipe } from './Pipes/website.pipe';

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
    WebsitePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
