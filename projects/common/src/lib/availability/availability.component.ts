import { Component, ViewChild, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Availability, BASE_AVAILABILITY } from '../../models/playeravailability';
import {
  IgxTimePickerComponent,
  IgxDialogComponent,
  IChipClickEventArgs,
  IBaseChipEventArgs,
  IgxDialogModule,
  IgxChipsModule,
  IgxTimePickerModule
} from '@infragistics/igniteui-angular';
import { WeekdayPipe } from '../pipes/weekday.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bg-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent {
  @Input()
  public set availability(availability: Availability []) {
    if (availability?.length > 0) {
      this._availability = availability;
      this.augmentAvailability();
    }
  }

  public baseAvailability = structuredClone(BASE_AVAILABILITY);

  @Input()
  public editable = false;

  @Output()
  public availabilityChanged = new EventEmitter<Availability>();

  private _availability: Availability [];

  @ViewChild('from')
  private from: IgxTimePickerComponent;

  @ViewChild('to')
  private to: IgxTimePickerComponent;

  @ViewChild(IgxDialogComponent, { static: true })
  private dialog: IgxDialogComponent;

  public selectedDay: Availability;

  public daySelected(args: IChipClickEventArgs, day: Availability) {
    if (this.editable) {
      args.cancel = true;
      this.selectedDay = day;
      this.dialog.open();
    }
  }

  public dayDeselected(args: IBaseChipEventArgs, day: Availability) {
    (args.originalEvent as PointerEvent).stopPropagation();
    day.available = false;
    this.availabilityChanged.emit(day);
  }

  public availabilityChange() {
    this.selectedDay.from = this.from.value as Date;
    this.selectedDay.to = this.to.value as Date;
    this.selectedDay.available = true;
    this.availabilityChanged.emit(this.selectedDay);
    this.dialog.close();
  }

  public availabilityCancel() {
    this.dialog.close();
  }

  private augmentAvailability() {
    this._availability.forEach(playerAvailability => {
      const day = this.baseAvailability.find(a => a.day === playerAvailability.day);
      day.available = playerAvailability.available
      day.from = new Date(playerAvailability.from);
      day.to = new Date(playerAvailability.to);
    });
  }
}

@NgModule({
  declarations: [
    AvailabilityComponent,
    WeekdayPipe
  ],
  exports: [
    AvailabilityComponent,
    WeekdayPipe
  ],
  imports: [
    CommonModule,
    IgxDialogModule,
    IgxChipsModule,
    IgxTimePickerModule
  ]
})
export class AvailabilityModule {}