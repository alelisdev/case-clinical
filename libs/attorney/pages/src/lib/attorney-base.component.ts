import { Component, HostListener } from "@angular/core";

@Component({
  selector: 'attorney-base-component',
  template: '',
})
export abstract class AttorneyBaseComponent {

  @HostListener('window:resize', ['$event']) onResize() {
    this.determinePosition();
  }
  @HostListener('window:load', ['$event']) onLoad() {
    this.determinePosition();
  }
  @HostListener('window:change', ['$event']) onChange() {
    this.determinePosition();
  }

  determinePosition(){
    const body = document.body,
    html = document.documentElement;
    let windowHeight = 960;
    windowHeight = Math.min( body.scrollHeight, body.offsetHeight, html.clientHeight, html.offsetHeight );

    const header =  document.querySelector('.header');
    const headerStyle = window.getComputedStyle(header == null ? html : header, null);
    const headerHeight = + headerStyle.getPropertyValue("height").replace('px','');

    const breadcrum =  document.querySelector('.breadcrum');
    const breadcrumStyle = window.getComputedStyle(breadcrum == null ? html : breadcrum, null);
    const breadcrumHeight = + breadcrumStyle.getPropertyValue("height").replace('px','');
   
    const footer =  document.querySelector('.footer');
    const footerStyle = window.getComputedStyle(footer == null ? html : footer, null);
    const footerHeight = + footerStyle.getPropertyValue("height").replace('px','');
    
    
    let minHeight = windowHeight - footerHeight - breadcrumHeight -  headerHeight;
    if(minHeight<500) minHeight =   500;
  }
}
