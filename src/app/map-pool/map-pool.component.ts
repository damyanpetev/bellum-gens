import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MapPool } from '../models/csgomaps';

@Component({
  selector: 'app-map-pool',
  templateUrl: './map-pool.component.html',
  styleUrls: ['./map-pool.component.css']
})
export class MapPoolComponent implements OnInit {

  @Input()
  mapPool: MapPool [];

  @Input()
  readOnly: boolean;

  @Output()
  update = new EventEmitter<MapPool>();

  constructor() { }

  ngOnInit() {
  }

  public mapChange(args) {
    args.checkbox.value.IsPlayed = args.checked;
    this.update.emit(args.checkbox.value);
  }

}