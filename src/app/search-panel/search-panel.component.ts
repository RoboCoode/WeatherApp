import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent implements OnInit {
  search: string = '';
  tit: string = '';

  list_cities = [
    { name: 'Bratislava', cord: ['48.1482', '17.1067'] },
    { name: 'Humenne', cord: ['48.9371', '21.9163'] },
    { name: 'Koromla', cord: ['48.7163', '22.2926'] },
    { name: 'Kosice', cord: ['48.714', '21.2581'] },
    { name: 'Michalovce', cord: ['48.7543', '21.9195'] },
    { name: 'Sobrance', cord: ['48.7445', '22.1814'] },
  ];

  rollback_cities = [
    { name: 'Bratislava', cord: ['48.1482', '17.1067'] },
    { name: 'Humenne', cord: ['48.9371', '21.9163'] },
    { name: 'Koromla', cord: ['48.7163', '22.2926'] },
    { name: 'Kosice', cord: ['48.714', '21.2581'] },
    { name: 'Michalovce', cord: ['48.7543', '21.9195'] },
    { name: 'Sobrance', cord: ['48.7445', '22.1814'] },
  ];

  constructor() {}

  ngOnInit(): void {}

  unamed() {}

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
