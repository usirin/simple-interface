import expect from 'expect'
import { createInterface, isInterface, isInstanceOf } from '../src'

describe('simple-interface', () => {

  describe('#createInterface', () => {
    it('should create an interface with a name', () => {
      let FooInterface = createInterface('FooInterface', {
        foo: String
      })
      expect(FooInterface.name).toBe('FooInterface')
      expect(FooInterface.__interfaceSymbol.toString()).toBe('Symbol(FooInterface)')
    })

    it('creates an interface with any builtin JS object', () => {
      let FooInterface = createInterface('FooInterface', {
        foo: String,
        bar: Number,
        baz: Boolean,
        qux: Function,
        obj: Object,
        array: Array,
        sym: Symbol
      })

      let obj = {
        foo: 'foo', bar: 5, baz: true, qux: (() => 5), array: [1, 2, 3], obj: {}, sym: Symbol('symbol')
      }

      expect(FooInterface.isInstance(obj)).toBe(true)
    })

    it('can have a custom class as interface value', () => {
      class Klass {}
      let ClassInterface = createInterface('ClassInterface', {
        klass: Klass
      })

      let obj = {
        klass: new Klass
      }

      expect(ClassInterface.isInstance(obj)).toBe(true)
    })

    it('should create an interface', () => {
      let FooInterface = createInterface('FooInterface', {
        foo: String
      })

      expect(isInterface(FooInterface)).toBe(true)
    })

    it('should check if a candidate is an instance of an interface', () => {
      let FooInterface = createInterface('FooInterface', {
        foo: String
      })

      expect(FooInterface.isInstance({foo: 'foo'})).toBe(true)
      expect(FooInterface.isInstance({foo: 5})).toBe(false)
    })

    it('should allow nesting interfaces', () => {
      let FooInterface = createInterface('FooInterface', {
        title: String
      })
      let BarInterface = createInterface('BarInterface', {
        foo: FooInterface
      })

      expect(BarInterface.isInstance({foo: { title: 'bar' }})).toBe(true)
    })

    it('should have all the keys present defined in the interface', () => {
      let PostInterface = createInterface('PostInterface', {
        title: String,
        body: String
      })

      let post = {title: 'foo'}

      expect(PostInterface.isInstance(post)).toBe(false)
    })
  })

  describe('#isInstanceOf', () => {
    it('should return false if given candidate does not exist', () => {
      let def = { foo: String }

      expect(isInstanceOf(def, undefined)).toBe(false)
      expect(isInstanceOf(def, null)).toBe(false)
    })

    it('should check if a candate satisfies given interface', () => {
      let postInterfaceDefinition = {
        title: String,
        body: String
      }

      expect(isInstanceOf(postInterfaceDefinition, {title: 'foo', body: 'bar'})).toBe(true)
    })

    it('should accept a custom key extractor', () => {
      let postInterfaceDefinition = {
        title: String,
        body: String
      }

      // this is identical to immutable.js api.
      let post = {
        _title: 'foo',
        _body: 'bar',
        get(key) {
          return this[`_${key}`]
        }
      }

      let customExtractor = (obj, key) => obj.get(key)

      let isPost = isInstanceOf(postInterfaceDefinition, post, customExtractor)

      expect(isPost).toBe(true)
    })
  })

  describe('#toString', () => {
    it('should print an interface', () => {
      let FooInterface = createInterface('FooInterface', {
        title: String
      })
      let BarInterface = createInterface('BarInterface', {
        foo: FooInterface
      })

      expect(BarInterface.toString()).toBe('BarInterface { foo: FooInterface { title: String } }')
    })
  })

  describe('#getContract', () => {
    it('should return interface definition', () => {
      let FooInterface = createInterface('FooInterface', {
        title: String
      })

      expect(FooInterface.getContract()).toEqual({
        title: String
      })
    })
  })
})
