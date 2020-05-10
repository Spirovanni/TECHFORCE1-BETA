import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {single} from './data';

// import { AppSettings } from '../../../app.settings';
// import { Settings } from '../../../app.settings.model';

import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ActivatedRoute, Data} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../service/user.service";
import {ProfilePictureService} from "../../../service/profile-picture.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormControl} from "@angular/forms";
import {HabitService} from "../../../service/habit.service";
import {MessageService} from "../../../service/message.service";
import {TypeService} from "../../../service/type.service";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {HabitUserResolver} from "../../../resolver/habit-user.resolver";
import {Observable} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MessageListItem} from "../../../message-list/message-list.component";
import * as moment from "moment";

import * as d3 from 'd3';

@Component({
  selector: 'app-barbicon',
  templateUrl: './barbicon.component.html',
  styleUrls: ['./barbicon.component.scss']
})
export class BarbiconComponent implements OnInit {
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

  friendsTable() {
    this.paginator.length = this.friends.length;
    this.dataSource = new MatTableDataSource(this.friends);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  updateMessage() {
    if (this.filteredHabits.length !== 0) {
      const types = this.filteredHabits.map((h) => {
        return h.type_id;
      });
      const type = types[Math.floor(Math.random() * types.length)];
      return this.typeService.getType(type).subscribe((t: any) => {
        return this.messageService.getAll().subscribe((m: any) => {
          this.dailyMessage = m.filter((i: any) => {
            return i.type === type;
          })[0].message;
          return this.currentLink = t.helpful_link;
        });
      });
      this.breakpoint = (innerWidth <= 1050) ? 1 : 2;
    }
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.users = this.users.filter(f => f.id !== this.ID);
    return this.users.filter((u) => {
      return u.username.toString().toLowerCase().includes(filterValue) || u.email.toString().toLowerCase().includes(filterValue);
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1050) ? 1 : 2;
  }

  populateInfo(habit: any[]): any[] {
    return habit.map((x) => {
      const start = moment(x.start_date).startOf('day');
      const end = moment(x.end_date).startOf('day');
      const today = moment().startOf('day');
      const duration = end.diff(start, 'day');
      const percentage = (x.clicked / duration * 100);
      x.late = moment().endOf('day').isAfter(moment(x.last_click).add(x.interval + 1, 'day'));
      x.clicked = x.late ? x.clicked - 1 : x.clicked;
      x.percentage = percentage < 0 || percentage > 100 || isNaN(percentage) ? '0' : percentage.toFixed(0);
      x.duration = duration < 0 ? duration * -1 : duration;
      if (moment().startOf('day').isSameOrAfter(end.startOf('day'))) {
        x.is_finished = true;
        x.today = true;
        x.failed = x.is_finished && x.percentage <= 50;
        x.left = 0;
        return x;
      } else {
        x.today = today.isSameOrAfter(start) ? moment(x.last_click).add(x.interval - 1, 'day').startOf('day')
          .isSameOrAfter(today) : true;
        const left = end.diff(today, 'day');
        x.left = left < 0 ? left * -1 : left;
        return x;
      }
    });
  }

  goHelpfulLink() {
    if (this.currentLink !== null) {
      window.open(this.currentLink, '_blank');
    } else {
      this.snackbar.open('There is no link available!', 'close', {duration: 1000});
    }
  }

  generatePdf() {
    const documentDefinition = {
      content: [
        {
          image: 'data:image/png;base64,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',
          width: 600,
          height: 120,
          alignment: 'center',
        },
        {
          text: 'Your Flight Plan Summary',
          bold: true,
          fontSize: 25,
          alignment: 'center',
          margin: [0, 20, 0, 20]
        },
        {
          columns: [
            [{
              text: this.username,
              style: 'name',
              bold: true,
              fontSize: 18,
              color: this.profileColor,
              margin: [0, 10, 0, 10]
            },
              {
                text: 'First Name: ' + this.firstname,
                fontSize: 15,
                margin: [0, 10, 0, 0]
              },
              {
                text: 'Last Name: ' + this.lastname,
                fontSize: 15,
                margin: [0, 10, 0, 0]
              },
              {
                text: 'Email: ' + this.email,
                fontSize: 15,
                margin: [0, 10, 0, 0]
              },
              {
                text: 'Level: ' + this.level,
                fontSize: 15,
                margin: [0, 10, 0, 0]
              },
              {
                text: 'Score: ' + this.score,
                fontSize: 15,
                margin: [0, 10, 0, 0],
              },
              {
                text: 'Created Habits: ',
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 10],
              },
              {
                columns: [
                  this.habitList
                ],
              },
            ],
            [
              // Document definition for Profile pic
            ]
          ]
        }
      ]
    };
    pdfMake.createPdf(documentDefinition).download();
  }

  onEnterFriend(user: any) {
    const friendsplus = this.friends.filter(f => f.id !== user.id).concat(user).filter(f => f.id !== this.ID);
    const friends = this.friendsList.concat(user.id).filter(f => f !== this.ID);
    this.userService.updateUser({
      id: this.ID,
      friends,
    }).subscribe();
    this.friendsForm.patchValue('');
    this.friendsList = friends;
    this.friends = friendsplus;
    this.friends.forEach(f => f.score = f.score.split(',').reverse()[0]);
    this.friends.reverse();
    document.getElementById('mat-input-0').blur();
    this.friendsTable();
  }

  removeFriend(id: number) {
    this.users = this.users.concat(this.friends.filter(f => f === id));
    this.friends = this.friends.filter((f) => {
      return f.id !== id;
    });
    this.friendsTable();
    const friends = this.friendsList.filter(f => f !== id);
    this.userService.updateUser({
      id: this.ID,
      friends,
    }).subscribe();
    this.friendsList = friends;
  }

  getCategorySymbol(type: number) {
    if (type === 1) {
      return '🎓';
    }
    if (type === 2) {
      return '🦴';
    }
    if (type === 3) {
      return '🏀';
    }
    if (type === 4) {
      return '👫';
    }
    if (type === 5) {
      return '🥙';
    }
    if (type === 6) {
      return '🛁';
    }
    if (type === 7) {
      return '🗣';
    }
    if (type === 8) {
      return '🧠';
    }
    if (type === 9) {
      return '💶';
    }
    if (type === 10) {
      return '🕜';
    }
    if (type === 11) {
      return '🔶';
    }
  }

  isNumber(num: number) {
    return !isNaN(num);
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('password_check').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('password_check').setErrors({pw_check: true});
    }
  }

  getsPoints(streak: number): number {
    if (streak < 14) {
      return 2;
    }
    if (streak < 30) {
      return 4;
    }
    if (streak < 90) {
      return 8;
    }
    return 10;
  }

  getLevel(score: number): number {
    const withoutModulo = score - (score % 20);
    return withoutModulo / 20 !== 0 ? withoutModulo / 20 : 1;
  }

  logActive(habit: any): void {
    const is_finished = moment().startOf('day').isSameOrAfter(moment(habit.end_date).startOf('day'));
    this.userService.getUser().subscribe((res: any) => {
      const streak = habit.late ? 0 : res.streak + 1;
      const add: number = this.getsPoints(streak);
      const scoreList = res.score.split(',');
      const currentScore: number = +scoreList.reverse()[0];
      const scoreN: number = habit.failed ? currentScore - 50 : habit.percentage > 50 && is_finished ?
        currentScore + add + 50 : currentScore + add;
      const score = res.score.split(',') + ',' + scoreN;
      const level = habit.failed ? res.level - 1 : this.getLevel(scoreN);
      return this.http.patch('/api/user/' + this.ID + '/update', {
        streak,
        score,
        level
      }).subscribe((res2: any) => {
        this.chartScore = res2.score;
        this.score = res2.score.split(',').reverse()[0];
        this.level = res2.level;
        this.updateCharts();
        this.updateMessage();
      });
    });
    this.habitService.updateHabit({
      clicked: habit.clicked + 1,
      id: habit.id,
      last_click: moment().endOf('day'),
      is_finished,
    }).subscribe((res: any) => {
      this.filteredHabits.filter((x) => {
        return x.id === res.id;
      }).map((x) => {
        x.today = true;
        x.clicked++;
        x.percentage = ((x.clicked / x.duration) * 100).toFixed(0);
        x.failed = x.is_finished && x.percentage <= 50;
        return x;
      });
      this.updateCharts();
      this.updateMessage();
    });
  }

  enableEdit() {
    this.habitsEditable = !this.habitsEditable;
  }

  deleteHabit(id: number) {
    this.habitService.deleteHabit(id).subscribe();
    this.filteredHabits = this.filteredHabits.filter((x) => {
      return x.id !== id;
    });
    this.empty = this.filteredHabits.length === 0;
    this.updateCharts();
    this.updateMessage();
  }

  openHabitDialog(habit: any) {
    const dialogRef = this.dialog.open(HabitDashboardHabitEditComponent, {
      width: '500px',
      data: {
        id: habit.id,
        start_date: habit.start_date,
        end_date: habit.end_date,
        name: habit.name,
        interval: habit.interval,
        priority: habit.priority === 3 ? 1 : habit.priority === 2 ? 2 : 3,
        type: this.typeOptions.filter(t => t.id === habit.type)[0],
        typeOptions: this.typeOptions
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.priority = result.priority === 3 ? 1 : result.priority === 2 ? 2 : 3;
        result.type = result.type.id;
        this.habitService.updateHabit(result).subscribe();
        this.snackbar.open('Successfully Updated!', 'close', {duration: 1000});
        this.filteredHabits = this.filteredHabits.filter((h) => {
          return h.id !== result.id;
        }).concat(result).sort((a, b) => {
          return moment(a.start_date).diff(moment(b.start_date));
        });
        this.populateInfo(this.filteredHabits);
        this.updateCharts();
        this.updateMessage();
      }
    });
  }

  openDialog(): void {
    const data = this.route.snapshot.data;
    this.passwordForm = this.fb.group({
      id: [this.userId],
      old_password: [''],
      password: [''],
      password_check: ['']
    }, {validator: this.passwordMatchValidator});

    const dialogRef = this.dialog.open(HabitPasswordChangeComponentDash, {
      width: '250px',
      data: {password: this.password, password_check: this.password_check, old_password: this.old_password}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.passwordForm.patchValue(result);
        if (this.passwordForm.controls.password_check.hasError('pw_check')) {
          this.snackbar.open('Sorry, passwords did not match!', 'close', {duration: 1000});
        } else {
          this.userService.updatePassword(this.passwordForm.value).subscribe(() => {
            this.snackbar.open('Successfully Updated!', 'close', {duration: 1000});
            this.userService.logout();
          });
        }
      }
    });
  }

  openDialogUser(): void {
    this.userDataForm = this.fb.group({
      id: [this.userId],
      username: [''],
      first_name: [''],
      last_name: [''],
      email: ['']
    });

    const dialogRef = this.dialog.open(HabitUserDataChangeComponent, {
      width: '250px',
      data: {id: this.userId, username: this.username, first_name: this.firstname, last_name: this.lastname, email: this.email}
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isErroneos = false;
        this.userService.getUnique().subscribe((r: any[]) => {
          r.forEach((u) => {
            if (u.id !== result.id && (u.username === result.username || u.email === result.email)) {
              this.isErroneos = true;
              this.snackbar.open('Username or Email has already been taken!', 'close', {duration: 1000});
            }
          });
          this.userDataForm.patchValue(result);
          if (this.userDataForm.controls.email.hasError('email_check')) {
            this.snackbar.open('Sorry, wrong email pattern', 'close', {duration: 1000});
          } else if (result.email !== this.email && !this.isErroneos) {
            this.userService.updateUser(this.userDataForm.value).subscribe(() => {
              this.snackbar.open('You need to log in again!', 'close', {duration: 1000});
              this.userService.logout();
            });
          } else if (!this.isErroneos) {
            this.userService.updateUser(this.userDataForm.value).subscribe((res: any) => {
              this.email = res.email;
              this.username = res.username;
              this.firstname = res.first_name;
              this.lastname = res.last_name;
              this.snackbar.open('Updated successfully!', 'close', {duration: 1000});
            });
          }
        });
      }
    });
  }

  updateCharts(): void {
    this.habitChart = [];
    this.typeChart = [];
    this.pointChart = [];
    this.habitChart = [
      {name: 'Active', value: this.filteredHabits.filter(h => !h.is_finished).length},
      {name: 'Finished', value: this.filteredHabits.filter(h => h.is_finished && !h.failed).length},
      {name: 'Failed', value: this.filteredHabits.filter(h => h.failed).length},
      {name: 'Late', value: this.filteredHabits.filter(h => h.late).length},
    ];
    const assignedTypes = new Map();
    this.filteredHabits.forEach((t) => {
      if (assignedTypes.has(t.type)) {
        let old = assignedTypes.get(t.type) + 1;
        assignedTypes.set(t.type, old++);
      } else {
        assignedTypes.set(t.type, 1);
      }
    });
    assignedTypes.forEach((value, key) => {
      const name = this.typeOptions.filter(o => o.id === key)[0].name;
      this.typeChart.push({name, value});
    });
    const series = [];
    this.chartScore.split(',').forEach((s, i) => {
      series.push({
        name: i,
        value: s
      });
    });
    this.pointChart.push({
      name: this.username,
      series
    });
  }

  getPrioSym(habit: any): string {
    const color: string = habit.late ? '❗️' : '❕';
    return color + (habit.priority === 3 ? '3️' : habit.priority === 2 ? '2️' : '1️');
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(HabitDashboardHabitEditComponent, {
      width: '500px',
      data: {
        start_date: moment(),
        end_date: null,
        name: '',
        priority: 1,
        type: 0,
        typeOptions: this.typeOptions,
        member: this.ID
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.priority = result.priority === 3 ? 1 : result.priority === 2 ? 2 : 3;
        result.type = result.type.id;
        this.habitService.saveHabit(result).subscribe((res: any) => {
          this.snackbar.open('Successfully Created!', 'close', {duration: 1000});
          this.filteredHabits = this.filteredHabits.filter((h) => {
            return h.id !== res.id;
          }).concat(this.populateInfo([res])).sort((a, b) => {
            return moment(a.start_date).diff(moment(b.start_date));
          });
          this.empty = this.filteredHabits.length === 0;
          this.updateCharts();
          this.updateMessage();
        });
      }
    });
  }
}


export interface HabitDialogData {
  id: number;
  start_date: any;
  end_date: any;
  name: string;
  priority: number;
  typeOptions: any;
  type: number;
}

@Component({
  selector: 'app-dashboard-habitedit.component',
  templateUrl: 'dashboard-habitedit.component.html',
})
export class HabitDashboardHabitEditComponent {

  constructor(
    public dialogRef: MatDialogRef<HabitDashboardHabitEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HabitDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  disableCheck() {
    const startDate = moment(this.data.start_date).startOf('day');
    const endDate = moment(this.data.end_date).startOf('day');
    return (startDate.diff(endDate, 'day') === 0 || !this.data.name || !this.data.end_date || !this.data.start_date);
  }

  moment() {
    return moment();
  }

  getMax() {
    return moment(this.data.start_date).add(1, 'year');
  }

  getEnd(event: any) {
    const end_date = moment(this.data.start_date);
    const unit = event.duration === 52 || event.duration === 39 || event.duration === 26 || event.duration === 13 ? 'year' :
      event.duration >= 4 ? 'month' : 'week';
    const duration = unit === 'year' ? (event.duration / 52) : unit === 'month' ? (event.duration / 4) : event.duration;
    end_date.add(duration, unit).endOf('day');
    this.data.end_date = end_date;
  }
}

export interface DialogData {
  password: string;
  password_check: string;
  old_password: string;
}

@Component({
  selector: 'app-password-change-dash.component',
  templateUrl: 'password-change-dash.component.html',
})
// tslint:disable-next-line:component-class-suffix
export class HabitPasswordChangeComponentDash {

  constructor(
    public dialogRef: MatDialogRef<HabitPasswordChangeComponentDash>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  disableCheck() {
    return (!this.data.password || !this.data.old_password || !this.data.password_check || this.data.password.length < 8 ||
      this.data.password_check.length < 8 || this.data.old_password.length < 8);
  }
}

export interface UserData {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-user-info.component',
  templateUrl: 'user-info.component.html',
})
export class HabitUserDataChangeComponent {

  constructor(
    public dialogRef: MatDialogRef<HabitUserDataChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  disableCheck2() {
    const emailValidator = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    return !(this.data.username && this.data.first_name && this.data.last_name && emailValidator.test(this.data.email));
  }
}
