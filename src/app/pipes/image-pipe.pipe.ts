import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePipe'
})
export class ImagePipePipe implements PipeTransform {

  transform(url: string): string {
    if (url) {
      return url;
    } else {
      return "./assets/noimga.jpg";
    }
  }

}
