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
  selector: '[appDragDropBox]',
})
export class DragDropBoxDirective implements OnDestroy {
  @Output('dragEnterd') readonly enterd: EventEmitter<DragEvent> =
    new EventEmitter<DragEvent>();

  @Output('dragDroped') readonly droped: EventEmitter<{
    ev: DragEvent,
    data: string
  }> =
    new EventEmitter<{
      ev: DragEvent,
      data: string
    }>();
  @Output('dragLeaved') readonly leaved: EventEmitter<DragEvent> =
    new EventEmitter<DragEvent>();

  @Input('previewClass') previewClass = 'previewPlacehoder'

  currentData: any;

  constructor(
    public element: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) _document: Document,
    private _ngZone: NgZone
  ) {
    const _el = element.nativeElement;
    _ngZone.runOutsideAngular(() => {

      _el.addEventListener('dragenter', (ev: any) => {
        this.enterd.emit(ev);
        console.log('enter box')
        const toEl: HTMLElement = ev.toElement
        _el.classList.add(this.previewClass)
      });

      _el.addEventListener('dragleave', (ev: any) => {
        this.leaved.emit(ev);
        const toEl: HTMLElement = ev.toElement
        _el.classList.remove(this.previewClass)
      });
      // dragover会阻止放入
      _el.addEventListener('dragover', (ev) => {
        ev.preventDefault()
      })

    });

    _el.addEventListener('drop', (ev: any) => {
      ev.preventDefault()
      console.log('drop')
      const toEl: HTMLElement = ev.toElement;
      _el.classList.remove(this.previewClass)
      let data = ev.dataTransfer?.getData('Text');
      try {
        data = JSON.parse(ev.dataTransfer?.getData('Text'))
      } catch (error) {

      }

      this.droped.emit({
        ev,
        data: data
      });

    });
  }

  ngOnDestroy() {
    this._ngZone.runOutsideAngular(() => {
      this.element.nativeElement.removeAllListeners?.();
    });
  }
}
