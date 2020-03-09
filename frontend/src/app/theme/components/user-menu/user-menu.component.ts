import {Component, HostListener, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {ProfilePictureService} from '../../../service/profile-picture.service';
import {HttpClient} from "@angular/common/http";
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import {NavbarService} from '../../../service/navbar.service';
import {NavigationEnd, Router} from "@angular/router";
import {MenuService} from "../menu/menu.service";
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {

  username: string;
  level: string;
  @Input() color: string;
  profilepictures: any[];
  testcolor = '';
  ppColor;
  colorPP;
  isLoggedIn = false;
  isSuperUser;
  picturesource = '';
  pictureId;
  windowsize = 'block';
  imageExists = false;
  showComponent;

  public optionsPsConfig: PerfectScrollbarConfigInterface = {};
  public settings:Settings;

  public userImage = "assets/img/users/user.jpg";
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private profilePictureService: ProfilePictureService,
    private navbar: NavbarService,
    private menuService: MenuService,
    public appSettings:AppSettings,
    public router:Router
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.navbar.changeColor.subscribe((data) => {
      this.colorPP = data;
    });
    this.navbar.changePicture.subscribe((data) => {
      this.imageExists = true;
      this.picturesource = data;
    });
    this.navbar.disablePicture.subscribe(data => {
      this.imageExists = data;
    });
    this.navbar.showPicture.subscribe((data) => {
      this.pictureId = data;
    });
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.userService.getUser().subscribe((res: any) => {
      this.username = res.username;
      this.level = res.level;
      this.isSuperUser = res.is_superuser;
      if (res.profile_picture != null) {
        this.ppColor = this.profilePictureService.getPicture(res.profile_picture)
          .subscribe((response: any) => {
            this.pictureId = response.id;
            this.colorPP = this.getColorVal(response.color);
            this.http.get('/api/profilepicture/' + this.pictureId + '/get').subscribe((res2: any) => {
              if (res2.picture) {
                this.imageExists = true;
                this.picturesource = '../../assets/Resources/profile_pictures/carrot' + res2.picture + '.svg';
              }
            });
          });
      }
    });
    if (window.screen.width < 500) { // 768px portrait
      this.windowsize = 'none';
    }
  }

  onResize(event) {
    this.windowsize = (event.target.innerWidth <= 500) ? 'none' : 'block';
  }

  getColorVal(letter: string) {
    if (letter === 'r') {
      return '#ff1744';
    }
    if (letter === 'g') {
      return '#00e676';
    }
    if (letter === 't') {
      return '#00e5ff';
    }
    if (letter === 'y') {
      return '#ffea00';
    }
    if (letter === 'o') {
      return '#ff9100';
    }
    if (letter === 'v') {
      return '#2979ff';
    }
    if (letter === 'b') {
      return '#b388ff';
    }
    if (letter === 'w') {
      return '#d4e157';
    }
  }

}
