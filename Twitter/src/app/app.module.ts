import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FollowRecommendationsComponent } from './Components/follow-recommendations/follow-recommendations.component';
import { TrendsRecommendationComponent } from './Components/trends-recommendation/trends-recommendation.component';
import { HomeComponent } from './Components/home/home.component';
import { ConnectComponent } from './Components/connect/connect.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ExploreComponent } from './Components/explore/explore.component';
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

@NgModule({
  declarations: [
    AppComponent,
    FollowRecommendationsComponent,
    TrendsRecommendationComponent,
    HomeComponent,
    ConnectComponent,
    ProfileComponent,
    ExploreComponent,
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
    HumanDatesPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
