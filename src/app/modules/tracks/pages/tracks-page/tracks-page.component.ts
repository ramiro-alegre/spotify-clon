import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit {
  tracksTrendring:Array<TrackModel> = []
  tracksRandom:Array<TrackModel> = []

  listObservers$: Array<Subscription> = [];

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
     this.trackService.getAllTracks$()
        .subscribe((response:TrackModel[]) => {
          console.log(response)
          this.tracksTrendring = response;
          this.tracksRandom = response;
        })

     
  }

  ngOnDestroy():void{
  
  }

}
