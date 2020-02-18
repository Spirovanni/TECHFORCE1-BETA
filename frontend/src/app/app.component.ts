/** ****************************************************************************
 * app.component.ts Copyright ©️ 2020 by the HabitRabbit developers (ardianq, lachchri16, sweiland, YellowIcicle).
 ******************************************************************************/

import {Component, OnInit} from '@angular/core';
import {UserService} from './service/user.service';
import {ProfilePictureService} from './service/profile-picture.service';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  public settings: Settings;

  isLoggedIn = false;

  constructor(public appSettings:AppSettings, private userService: UserService, private profilePictureService: ProfilePictureService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
