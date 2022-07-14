import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent implements OnInit {
  @Output() emitData = new EventEmitter();
  search: string = '';
  

  listCities = [
    { name: 'Bratislava', cord: ['48.1482', '17.1067'], temp: '' },
    { name: 'Humenné', cord: ['48.9371', '21.9163'], temp: '' },
    { name: 'Koromľa', cord: ['48.7163', '22.2926'], temp: '' },
    { name: 'Košice', cord: ['48.714', '21.2581'], temp: '' },
    { name: 'Michalovce', cord: ['48.7543', '21.9195'], temp: '' },
    { name: 'Sobrance', cord: ['48.7445', '22.1814'], temp: '' },
  ];

  constructor() {}

  ngOnInit(): void {}

  sendData(longlat: string[]) {
    this.emitData.emit(longlat);
  }

  searchingCity(subs: string) {
    subs = subs.toLowerCase();
    let backupCities = this.listCities;

    if (subs == '') {
      this.listCities = backupCities;
      return this.listCities;
    } else {
      return (this.listCities = backupCities.filter((e) =>
        e.name.toLowerCase().includes(subs)
      ));
    }
  }
}
