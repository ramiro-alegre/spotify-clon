import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() callbackdData: EventEmitter<any> = new EventEmitter();

  src: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  callSearch(term: string):void{
    if(term.length >= 3){
      this.callbackdData.emit(term);
    }
  }

}
