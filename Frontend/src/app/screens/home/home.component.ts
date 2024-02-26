import { Component } from '@angular/core';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InfiniteScrollModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  onScroll() {
    console.log("scrolled!!");
  }
}
