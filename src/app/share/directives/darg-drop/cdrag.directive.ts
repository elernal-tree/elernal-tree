import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appCdrag]',
})
export class CdragDirective<T = any> implements OnDestroy {

  @Input('dragData') data!: any;

  // @Input() dataSource: string = 

  @Input('dataKey') key!: string;

  @Output('dragStarted') readonly started: EventEmitter<DragEvent> =
    new EventEmitter<DragEvent>();

  @Output('dragMoved') readonly moved: EventEmitter<DragEvent> =
    new EventEmitter<DragEvent>();


  constructor(
    public element: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) _document: Document,
    private _ngZone: NgZone
  ) {
    element.nativeElement?.setAttribute('draggable', 'true');
    _ngZone.runOutsideAngular(() => {
      const _el = element.nativeElement;
      _el.addEventListener('dragstart', (ev) => {
        this.started.emit(ev);
        let data = '';
        try {
          data = JSON.stringify(this.data);
        } catch (error) {
          data = this.data;
        }
        if(data) {
          ev.dataTransfer?.setData('Text', data);
        }
      
      });
      _el.addEventListener('drag', (ev) => {
        this.moved.emit(ev);
      });
    });
  }


  ngOnDestroy() {
    this._ngZone.runOutsideAngular(() => {
      this.element.nativeElement.removeAllListeners?.();
    });
  }
}
