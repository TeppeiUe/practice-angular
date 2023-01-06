import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setImg'
})
export class SetImgPipe implements PipeTransform {

  /**
   * set image uri
   * @param img base64
   * @returns image uri
   */
  transform(img: string): string {
    return img ?
      'data:image/jpeg;base64,' + img :
      './assets/img/baseline_person_black_24dp.png'
  }

}
