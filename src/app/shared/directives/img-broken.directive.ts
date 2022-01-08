import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @HostListener('error') handleError():void{
    const elNavite = this.elHost.nativeElement
    console.log('Esta imagen revento --->', this.elHost)
    elNavite.src = '../../../assets/images/Error.jpg'
  }

  constructor(private elHost:ElementRef) {
   
   }

}
