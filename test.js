/* global describe, it */

var expect = require('chai').expect
var generator = require('./')

describe('raml generator', function () {
  it('should compile a specification', function () {
    var generate = generator({
      templates: {
        out: '{{baseUri}}'
      }
    })

    expect(generate({
      baseUri: 'http://example.com'
    }).files.out).to.equal('http://example.com')
  })

  it('should iterate over resources', function () {
    var generate = generator({
      templates: {
        out: '{{#each allResources}}{{#each methods}}{{@key}}{{/each}}{{/each}}'
      }
    })

    expect(generate({
      resources: [{
        relativeUri: '/',
        methods: [
          { method: 'get' },
          { method: 'post' }
        ]
      }]
    }).files.out).to.equal('getpost')
  })

  describe('helpers', function () {
    describe('json', function () {
      it('should stringify', function () {
        var generate = generator({
          templates: {
            out: '{{json baseUri}}'
          }
        })

        expect(generate({
          baseUri: 'http://example.com'
        }).files.out).to.equal('"http://example.com"')
      })
    })
  })
})
