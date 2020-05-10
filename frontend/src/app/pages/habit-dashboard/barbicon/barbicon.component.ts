import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { single, multi } from '../../charts/charts.data';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-barbicon',
  templateUrl: './barbicon.component.html',
  styleUrls: ['./barbicon.component.scss']
})
export class BarbiconComponent {
  public single: any[];
  public multi: any[];
  public settings: Settings;

  constructor(public appSettings:AppSettings) {
  this.settings = this.appSettings.settings;
  Object.assign(this, {single, multi});
  }
  public onSelect(event) {
  console.log(event);
  }

}
