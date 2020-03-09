import {Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList, Input} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppSettings } from '../app.settings';
import { Settings } from '../app.settings.model';
import { rotate } from '../theme/utils/app-animation';
import { MenuService } from '../theme/components/menu/menu.service';

import {UserService} from '../service/user.service';
import {ProfilePictureService} from '../service/profile-picture.service';
import {NavbarService} from '../service/navbar.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-tf1',
  templateUrl: './tf1.component.html',
  styleUrls: ['./tf1.component.scss'],
  animations: [ rotate ],
  providers: [ MenuService ]
})
export class Tf1Component implements OnInit {
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
  levelIcon = '../../assets/Resources/navbar/level_icon.png';

  @ViewChild('sidenav') sidenav:any;
  @ViewChild('backToTop') backToTop:any;
  @ViewChildren(PerfectScrollbarDirective) pss: QueryList<PerfectScrollbarDirective>;
  public optionsPsConfig: PerfectScrollbarConfigInterface = {};
  public settings:Settings;
  public showSidenav:boolean = false;
  public showInfoContent:boolean = false;
  public toggleSearchBar:boolean = false;
  private defaultMenu:string; //declared for return default menu when window resized
  public menus = ['vertical', 'horizontal'];
  public menuOption:string;
  public menuTypes = ['default', 'compact', 'mini'];
  public menuTypeOption:string;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private profilePictureService: ProfilePictureService,
    private navbar: NavbarService,

    public appSettings:AppSettings,
    public router:Router,
    private menuService: MenuService){
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



    this.optionsPsConfig.wheelPropagation = false;
    if(window.innerWidth <= 960){
      this.settings.menu = 'vertical';
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    }
    this.menuOption = this.settings.menu;
    this.menuTypeOption = this.settings.menuType;
    this.defaultMenu = this.settings.menu;
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

  ngAfterViewInit(){
    setTimeout(() => { this.settings.loadingSpinner = false }, 300);
    this.backToTop.nativeElement.style.display = 'none';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
      if(window.innerWidth <= 960){
        this.sidenav.close();
      }
    });
    if(this.settings.menu == "vertical")
      this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems());
  }

  public toggleSidenav(){
    this.sidenav.toggle();
  }

  public chooseMenu(){
    this.settings.menu = this.menuOption;
    this.defaultMenu = this.menuOption;
    if(this.menuOption == 'horizontal'){
      this.settings.fixedSidenav = false;
    }
    this.router.navigate(['/']);
  }

  public chooseMenuType(){
    this.settings.menuType = this.menuTypeOption;
  }

  public changeTheme(theme){
    this.settings.theme = theme;
  }

  public closeInfoContent(showInfoContent){
    this.showInfoContent = !showInfoContent;
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    if(window.innerWidth <= 960){
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
      this.settings.menu = 'vertical'
    }
    else{
      (this.defaultMenu == 'horizontal') ? this.settings.menu = 'horizontal' : this.settings.menu = 'vertical'
      this.settings.sidenavIsOpened = true;
      this.settings.sidenavIsPinned = true;
    }
  }

  public onPsScrollY(event){
    (event.target.scrollTop > 300) ? this.backToTop.nativeElement.style.display = 'flex' : this.backToTop.nativeElement.style.display = 'none';
  }

  public scrollToTop() {
    this.pss.forEach(ps => {
      if(ps.elementRef.nativeElement.id == 'main'){
        ps.scrollToTop(0,250);
      }
    });
  }

  public closeSubMenus(){
    if(this.settings.menu == "vertical"){
      this.menuService.closeAllSubMenus();
    }
  }
}
