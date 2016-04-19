import extend from 'extend';
import Embed from './embed';
import Text from './text';
import Parchment from 'parchment';


class Inline extends Parchment.Inline {
  static compare(self, other) {
    return Inline.order.indexOf(self) - Inline.order.indexOf(other);
  }

  formatAt(index, length, name, value) {
    if (Inline.compare(this.statics.blotName, name) < 0 && Parchment.query(name, Parchment.Scope.BLOT)) {
      let blot = this.isolate(index, length);
      blot.wrap(name, value);
    } else {
      super.formatAt(index, length, name, value);
    }
  }
}
Inline.children = [Inline, Embed, Text];
// Lower index means deeper in the DOM tree, since not found (-1) is for embeds
Inline.order = [
  'cursor', 'inline',   // Must be lower
  'code', 'underline', 'strike', 'italic', 'bold', 'script',
  'link'                // Must be higher
];


export default Inline;
