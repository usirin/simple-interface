# simple-interface

Create interfaces to validate objects. It's so simple, probably doesn't support the fancy thing you are looking for.

### What?

While developing some state modeling, having an interface system to validate objects makes things easier to reason about:

```js
import { createInterface } from 'simple-interface'

const PostInterface = createInterface('PostInterface', {
  title: String,
  body: String
})

const post = {
  title: 'foo',
  body: 'bar'
}

PostInterface.isInstance(post) // => true
```

It doesn't try to solve every use case, but since the check to see if a value
satisfies the assigned interface value in an object is really easy (simply
compares object's constructor to see it matches the corresponding value in the
interface definition), it should cover most of your use cases.

```js
// custom class
class Klass {}

const ClassInterface = createInterface('ClassInterface', {
  klass: Klass
})

const obj = {
  klass: new Klass
}

ClassInterface.isInstance(obj) // => true
```

You can use other interfaces as interface values.

```js
import { createInterface } from 'simple-interface'

const FooInterface = createInterface('FooInterface', {
  title: String
})

const BarInterface = createInterface('BarInterface', {
  foo: FooInterface
})

BarInterface.isInstance({
  foo: {
    title: 'Hello World'
  }
})
// => true


BarInterface.toString()
// => BarInterface { foo: FooInterface { title: String } }
```

# install

    npm install simple-interface

