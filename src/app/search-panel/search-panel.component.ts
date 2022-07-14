import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent implements OnInit {
  @Output() emitData = new EventEmitter();

 

  search: string = '';
  tit: string = '';

  list_cities = [
    { name: 'Bratislava', cord: ['48.1482', '17.1067'] },
    { name: 'Humenné', cord: ['48.9371', '21.9163'] },
    { name: 'Koromľa', cord: ['48.7163', '22.2926'] },
    { name: 'Košice', cord: ['48.714', '21.2581'] },
    { name: 'Michalovce', cord: ['48.7543', '21.9195'] },
    { name: 'Sobrance', cord: ['48.7445', '22.1814'] },
  ];

  rollback_cities = [
    { name: 'Bratislava', cord: ['48.1482', '17.1067'] },
    { name: 'Humenné', cord: ['48.9371', '21.9163'] },
    { name: 'Koromľa', cord: ['48.7163', '22.2926'] },
    { name: 'Košice', cord: ['48.714', '21.2581'] },
    { name: 'Michalovce', cord: ['48.7543', '21.9195'] },
    { name: 'Sobrance', cord: ['48.7445', '22.1814'] },
  ];

  constructor() {}

  ngOnInit(): void {}

  sendData(longlat: string[]) {

    
    this.emitData.emit(longlat);
  }

  searching(subs: string) {
    subs = subs.toLowerCase();
    if (subs == '') {
      this.list_cities = this.rollback_cities;
      return this.list_cities;
    } else {
      return (this.list_cities = this.rollback_cities.filter((e) =>
        e.name.toLowerCase().includes(subs)
      ));
    }
  }
}
