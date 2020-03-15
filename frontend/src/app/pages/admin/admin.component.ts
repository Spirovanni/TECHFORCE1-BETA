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

  constructor() { }

  ngOnInit() {
  }

}
