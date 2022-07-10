import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent implements OnInit {
  list_city = [
    { name: 'Bratislava', cord: ['48.1482', '17.1067'] },
    { name: 'Humenné', cord: ['48.9371', '21.9163'] },
    { name: 'Koromľa', cord: ['48.7163', '22.2926'] },
    { name: 'Košice', cord: ['48.714', '21.2581'] },
    { name: 'Michalovce', cord: ['48.7543', '21.9195'] },
    { name: 'Sobrance', cord: ['48.7445', '22.1814'] },
  ];

  constructor() {}

  ngOnInit(): void {}


  unamed(){}
}
