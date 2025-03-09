import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() pages: number = 5;

  @Output() pageChange = new EventEmitter<number>();

  public currentPage: number = 2;
  public isHide = true;
  public iconColor = '#696868';
  public pagesArray: number[] = Array.from(
    { length: this.pages },
    (_, i) => i + 1
  );

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  onNext() {
    this.onPageChange(this.currentPage + 1);
  }

  onPrev() {
    this.onPageChange(this.currentPage - 1);
  }

  onMouseEnter(): void {
    this.iconColor = '#ffffff';
  }

  onMouseLeave(): void {
    this.iconColor = '#696868';
  }
}
