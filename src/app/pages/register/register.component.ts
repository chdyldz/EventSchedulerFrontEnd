import { Component, OnInit } from '@angular/core';
import {Event} from "../../models/event.model";
import {EventService} from "../../services/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  event: Event = new Event();
  eventList: Event[]=[];
  events: Array<Event>=[]; 
  scheduledEvents: Array<Event>=[]; 

  errorMessage: string = "";

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEventList().subscribe(data => {
      data.forEach((element:Event) => {
        this.events.push(element);
      });
      
    });

    this.eventService.getScheduleList().subscribe(data =>{
      data.forEach((element:Event) => {
        this.scheduledEvents.push(element);
      });
    });
    console.log(this.scheduledEvents);

  }
  removeAll(){
    this.eventService.removeAll().subscribe(data =>{
      window.location.reload();
    });

  }

  scheduleEvents(){
    this.eventService.getScheduleList().subscribe(data =>{
      data.forEach((element:Event) => {
        this.scheduledEvents.push(element);
      });
    });

  }
  save() {
    this.eventService.saveEvent(this.event).subscribe(data => {
      window.location.reload();
    
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred.';
        console.log(err);
      }
    })
  }

}
