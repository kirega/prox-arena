import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BattleService } from '../battle-service.service';
import { startWith, map } from 'rxjs/operators';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-event-results',
  templateUrl: './event-results.component.html',
  styleUrls: ['./event-results.component.scss']
})
export class EventResultsComponent implements OnInit {
  myForm: FormGroup;
  eventId;
  eventFilteredOptions;
  eventOptions;
  constructor(
    private fb: FormBuilder,
    private battleService: BattleService,
    @Inject(MAT_DIALOG_DATA) public sharedData: any
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      result: ['', [Validators.required]],
      eventId: ['', [Validators.required]],
    });
    this.battleService.getAllEvents().subscribe(
      res => {
        this.eventOptions = res;
        this.eventFilteredOptions = this.eventOptions;
      }
    );
    this.myForm.controls['eventId'].valueChanges
      .pipe(
        startWith( '' ),
        map( value => typeof value === 'string' ? value : value.name )
      )
      .subscribe( (value: string = '') => {
        const vals = [];
        // this.filteredOptions = this.options;
        if ( this.eventOptions && value.trim().length !== 0 ) {
          for ( const a of this.eventOptions ) {
            if ( a.name.toLowerCase().includes( value.toLowerCase().trim() ) ) {
              vals.push( a );
            }
          }
          this.eventFilteredOptions = vals;
        } else {
          this.eventFilteredOptions = this.eventOptions;
        }
      } );
  }
  createResult(){
    let data = this.myForm.value;
    data = {
      ...data,
      EventId: this.eventId,
      UserId: this.sharedData.id
    }
    this.battleService.createEventResult(data).subscribe(res => {
      console.log(res);
    });
  }

  selected(event) {
    this.eventId = event.option.value.id;
  }
  showEvent(event): string {
    return event && event.name ? event.name : '';
  }
  clearEvent(){
    this.myForm.controls['eventId'].patchValue(``);
    this.eventId = undefined;
  }
}
