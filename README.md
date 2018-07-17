# callbag-pump 👜

A callbag operator that turns a pullable source into a listenable source. Weighs <span class="weight">110</span> bytes (minified & gzipped).

`npm install callbag-pump`

## Usage:

```js
import pipe from 'callbag-pipe';
import fromIter from 'callbag-from-iter';
import observe from 'callbag-observe';
import pump from 'callbag-pump';

const source = fromIter([10, 20, 30]);

pipe(
  source,
  pump,
  observe(val => console.log( val ))
);

// 10
// 20
// 30
```
