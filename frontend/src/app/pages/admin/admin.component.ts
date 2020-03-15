import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {single} from './data';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {HabitService} from '../../service/habit.service';
import * as moment from 'moment';
import {UserService} from '../../service/user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {ProfilePictureService} from '../../service/profile-picture.service';
import {AbstractControl, FormBuilder, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MessageService} from '../../service/message.service';
import {TypeService} from '../../service/type.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {HabitUserResolver} from '../../resolver/habit-user.resolver';
import * as d3 from 'd3';
import {ActivatedRoute, Data} from '@angular/router';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MessageListItem} from '../../message-list/message-list.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  habitChart: any[] = single;

  curveStepAfter: any = d3.curveBasis;

  // options
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = true;
  legendPosition = 'right';
  /** Based on the screen size, switch from standard to one column per row */
  ID = this.userService.getID();
  habits: any[];
  habitsEditable: boolean;
  typeOptions: any[];
  userId;
  level;
  score;
  chartScore;
  email;
  username = '';
  firstname;
  lastname;
  profileColor;
  profileColorPop;
  profileImage;
  friends: any[];
  displayedColumnsFriends = ['username', 'score', 'actions'];
  users: any[] = [];
  dailyMessage;
  currentLink;
  filteredOptions: Observable<any[]>;
  typeChart: any[] = [];
  pointChart: any[] = [];
  password: string;
  // eslint-disable-next-line camelcase
  password_check: string;
  // eslint-disable-next-line camelcase
  old_password: string;
  passwordForm: any;
  userDataForm: any;
  friendsForm: FormControl;
  friendsList: number[];
  empty: boolean;
  filteredHabits: any[];
  habitList: Array<string> = new Array<string>();
  formatedHabitList;
  breakpoint;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<MessageListItem>;
  dataSource: MatTableDataSource<any>;

  colorScheme = {
    domain: [
      '#ffea00', '#b388ff', '#ff1744', '#ff9100',
      '#00e676', '#00e5ff', '#d4e157', '#2979ff',
      '#f9d95f', '#613db1', '#e15241', '#dcdcdc'
    ]
  };
  pointScheme = {
    domain: ['#ff9100']
  };


  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'User', cols: 1, rows: 2},
          {title: 'Co-Pilots', cols: 1, rows: 1},
          {title: 'Daily Message', cols: 1, rows: 1},
          {title: 'Active Habits', cols: 1, rows: 1},
          {title: 'PIREP', cols: 1, rows: 2},
        ];
      }

      return [
        {title: 'User', cols: 1, rows: 2},
        {title: 'Co-Pilots', cols: 1, rows: 1},
        {title: 'Daily Message', cols: 1, rows: 1},
        {title: 'Active Habits', cols: 1, rows: 2},
        {title: 'PIREP', cols: 1, rows: 2},
      ];
    })
  );
  private isErroneos: boolean;

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute,
              private http: HttpClient, private userService: UserService,
              private profilePictureService: ProfilePictureService, private snackbar: MatSnackBar,
              public dialog: MatDialog, private fb: FormBuilder, private habitService: HabitService,
              private messageService: MessageService, private typeService: TypeService, private habitUserResolver: HabitUserResolver) {
    Object.assign(this, {single});
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.breakpoint = 2;
    const data: Data = this.route.snapshot.data;
    if (data.typeOptions) {
      this.typeOptions = data.typeOptions;
    }
    this.friendsList = data.user.friends;
    this.userService.getAll().subscribe((res2: any[]) => {
      this.friends = res2.filter(x => data.user.friends.indexOf(x.id) !== -1);
      this.friends.forEach(f => f.score = f.score.split(',').reverse()[0]);
      this.friendsList = this.friends.map(f => f.id);
      this.friendsTable();
    });
    this.friendsForm = new FormControl();
    if (data.users) {
      this.users = data.users;
      this.filteredOptions = this.friendsForm.valueChanges
        .pipe(
          startWith(''),
          // eslint-disable-next-line no-underscore-dangle
          map(value => this._filter(value))
        );
    }
    if (data.habits) {
      this.habits = data.habits;
      this.filteredHabits = this.habits.filter(e => {
        return e.member === this.ID ? e : null;
      });
      this.empty = this.filteredHabits.length === 0;
      this.filteredHabits.sort((a, b) => {
        return moment(a.start_date).diff(moment(b.start_date));
      });
      this.populateInfo(this.filteredHabits);
    }
    if (data.user) {
      this.userId = data.user.id;
      this.level = data.user.level;
      this.chartScore = data.user.score;
      this.score = data.user.score.split(',').reverse()[0];
      this.email = data.user.email;
      this.username = data.user.username;
      this.firstname = data.user.first_name;
      this.lastname = data.user.last_name;
      if (data.user.profile_picture === null) {
        this.profileColor = '#613DB1';
        this.profileImage = false;
      } else {
        this.profilePictureService.getColor(data.user.profile_picture).subscribe((response: any) => {
          if (response.color === null) {
            this.profileColor = '#613DB1';
          } else {
            this.profileColor = this.profilePictureService.getColorVal(response.color);
            this.profileColorPop = this.profileColor + '80';
          }
          if (response.picture == null) {
            this.profileImage = false;
          } else {
            this.profileImage = '../../assets/Resources/profile_pictures/carrot' + response.picture + '.svg';
          }
        });
      }
      for (const habit of this.filteredHabits) {
        this.habitList.push('Habit Name: ' + habit.name + '\t' + 'Finished: ' + habit.is_finished);
      }
      this.formatedHabitList = this.habitList.join(',');
    }
    this.updateMessage();
    this.updateCharts();
  }

}
