import { Injectable, EventEmitter } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  myObservable1$: Subject<any> = new Subject();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!:HTMLAudioElement 
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe(responseOk => {
      if(responseOk){
        this.setAudio(responseOk);
      }
    })

    this.listenAllEvents();
   }

  public setAudio(track:TrackModel):void{
    this.audio.src = track.url;
    this.audio.play();
  }

  private listenAllEvents(): void{
    this.audio.addEventListener('timeupdate', this.calculateTime)
    this.audio.addEventListener('playing', this.setPlayerStatus)
    this.audio.addEventListener('play', this.setPlayerStatus)
    this.audio.addEventListener('pause', this.setPlayerStatus)
    this.audio.addEventListener('ended', this.setPlayerStatus)
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) { 
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default:
        this.playerStatus$.next('paused')
        break;
    }

  }

  public togglePlayer():void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }

  private calculateTime = () => {
    const {duration, currentTime} = this.audio;
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  }

  private setTimeElapsed(currentTime:number): void{
    let seconds = Math.floor(currentTime % 60) // Devuelve 1..2...3.. segundos
    let minutes = Math.floor((currentTime / 60) % 60) //Devuelve los minutos
    //Esto es unicamente para agregarle un 0 en el caso de que sea < 10 
    //Por ejemplo 
    //5 segundos => 05 segundos 
    //11 segundos => 11 segundos (No cambia)
    //Lo mismo para los minutos
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`;

    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(currentTime:number, duration:number ):void{
    let timeLeft = duration - currentTime;

    let seconds = Math.floor(timeLeft % 60) // Devuelve 1..2...3.. segundos
    let minutes = Math.floor((timeLeft / 60) % 60) //Devuelve los minutos

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeRemaining$.next(displayFormat);

  }

  private setPercentage(currentTime: number, duration:number):void{
    let percentage = (currentTime * 100) / duration;

    this.playerPercentage$.next(percentage);
  }

  public seekAudio(percentage: number):void{
    const {duration} = this.audio;
    const percentageToSecond = (percentage * duration) / 100
    this.audio.currentTime = percentageToSecond
  }
}
