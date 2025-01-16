import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[noWhitespace]'
})
export class NoWhitespaceDirective {
  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const inputValue = this.el.nativeElement.value;
    const trimmedValue = inputValue.replace(/^\s+/, '');
    this.el.nativeElement.value = trimmedValue;
    this.control?.control?.setValue(trimmedValue, { emitEvent: false });
  }
}
