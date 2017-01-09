/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DisconnectComponent } from './disconnect.component';

describe('DisconnectComponent', () => {
  let component: DisconnectComponent;
  let fixture: ComponentFixture<DisconnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisconnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
