import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherPanelComponent } from './weather-panel.component';

describe('WeatherPanelComponent', () => {
  let component: WeatherPanelComponent;
  let fixture: ComponentFixture<WeatherPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
