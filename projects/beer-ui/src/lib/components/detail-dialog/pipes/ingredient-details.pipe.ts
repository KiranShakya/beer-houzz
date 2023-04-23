import { Pipe, PipeTransform, Renderer2 } from '@angular/core';
import { IngredientDetails } from '../../../models/punk-api.model';

@Pipe({
  name: 'ingredientDetails',
})
export class IngredientDetailsPipe implements PipeTransform {
  constructor(private readonly renderer: Renderer2) {}

  transform(value: Array<Partial<IngredientDetails>> | string): string {
    // If string, then no need for processing
    if (typeof value === 'string') {
      return value;
    }
    // We create dl>dt+dd datalist for each type of ingredients
    const dl: HTMLDListElement = this.renderer.createElement('dl');
    value.forEach((item) => {
      const dt = this.renderer.createElement('dt');
      // dt will have ingredient name and amount if available
      dt.innerText = item.name;
      if (item.amount) {
        dt.innerText += ` (${item.amount.value} ${item.amount.unit})`;
      }
      if (item.add) {
        // this dd will show when this ingredient is added 
        const add = this.renderer.createElement('dd');
        add.innerText = `When to add: ${item.add}`;
        dt.appendChild(add);
      }
      if (item.attribute) {
        // this dd will show what this ingredient's attribute is 
        const attr = this.renderer.createElement('dd');
        attr.innerText = `Attribute: ${item.attribute}`;
        dt.appendChild(attr);
      }
      dl.appendChild(dt);
    });
    // return the generated HTML
    return dl.outerHTML;
  }
}
