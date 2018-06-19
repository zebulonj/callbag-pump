# callbag-pump 👜

A callbag operator that turns a pullable source into a listenable source. Weighs <span class="weight">124</span> bytes (minified & gzipped).

`npm install callbag-pump`

## Usage:

```js
import pipe from 'callbag-pipe';
import fromIter from 'callbag-from-iter';
import pump from 'callbag-pump';
import subscribe from 'callbag-subscribe';

const source = fromIter([10, 20, 30]);

pipe(
  source,
  pump,
  subscribe({
    next: val => console.log( val )
  })
);

// 10
// 20
// 30
```
