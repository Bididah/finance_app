import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownOption } from '../../interfaces/interface';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements OnInit {
  @Input() options!: DropdownOption[];
  @Input() tagColor: string = 'green';
  @Input() control = new FormControl();
  @Input() size: 'small' | 'large' = 'small';

  @ViewChild('wrapper') wrapper!: ElementRef;

  @Output() select = new EventEmitter<string>();
  @Output() blur = new EventEmitter();

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.wrapper.nativeElement.contains(event.target) && this.isDropdownOpen) {
      this.blur.emit();
      this.isDropdownOpen = false;
    }
  }

  public selectedLabel = '';
  public isDropdownOpen = false;

  ngOnInit(): void {
    this.selectedLabel = this.options.filter(
      (option) => option.default
    )[0].label;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: any) {
    this.selectedLabel = option.label;
    this.isDropdownOpen = false;
    this.select.emit(option.label);
  }
}
