/* global SEARCH_PATH, chai, describe, it, sinon */
'use strict';


var Catalog = require('latesteqs/Catalog'),
    Collection = require('mvc/Collection'),
    MetadataView = require('list/MetadataView'),
    Model = require('mvc/Model');


var expect = chai.expect;


describe('list/MetadataView', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof MetadataView).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(MetadataView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = MetadataView();

      expect(view.destroy).to.not.throw(Error);
    });
  });

  describe('displaySearchParameters', function () {
    it('creates list of search parameters from feed', function (done) {
      var catalog,
          view;

      catalog = Catalog();
      catalog.loadUrl('/feeds/2.5_week.geojson');

      view = MetadataView({
        collection: catalog,
        model: Model({
          feed: {
            'id': '123456789',
            'name' : 'Search Results',
            'isSearch': true,
            'params': {
              'test1': 'value1',
              'test2': 'value2',
              'test3': 'value3',
              'test4': 'value4'
            }
          }
        })
      });

      catalog.on('reset', function () {
        expect(view.el.querySelectorAll('.feed-metadata-list dt').length)
            .to.equal(1);
        expect(view.el.querySelectorAll('.search-parameter-list dt').length)
            .to.equal(4);

        view.destroy();
        done();
      });
    });
  });

  describe('onDownloadButtonClick', function () {
    it('shows the modal dialog', function () {
      var stub,
          view;

      view = MetadataView({
        collection: Collection(),
        model: Model()
      });

      stub = sinon.stub(view.downloadModal, 'show', function () { return; });
      view.onDownloadButtonClick();

      expect(stub.callCount).to.equal(1);
    });
  });

  describe('onSearchButtonClick', function () {
    it('calls setWindowLocation', function () {
      var stub,
          view;

      view = MetadataView({
        collection: Collection(),
        model: Model()
      });

      stub = sinon.stub(view, 'setWindowLocation', function () { return; });
      view.onSearchButtonClick();

      expect(stub.callCount).to.equal(1);
      expect(stub.calledWith(SEARCH_PATH + window.location.hash)).to.equal(true);
    });
  });

  describe('render', function () {
    it('shows the metadata view', function (done) {
      var catalog,
          displayStub,
          dateTimeStub,
          view;

      catalog = Catalog();
      catalog.loadUrl('/feeds/2.5_week.geojson');
      catalog.metadata = {
        count: 72,
        generated: 1500572838000
      };

      view = MetadataView({
        collection: catalog,
        model: Model({
          feed: {
            'id': '123456789',
            'name' : 'Search Results',
            'isSearch': true,
            'params': {
              'test1': 'value1',
              'test2': 'value2',
              'test3': 'value3',
              'test4': 'value4'
            }
          }
        })
      });

      dateTimeStub = sinon.stub(view.formatter, 'datetime', function () {
        return;
      });

      displayStub = sinon.stub(view, 'displaySearchParameters', function () {
        return;
      });

      view.render();

      catalog.on('reset', function () {
        expect(dateTimeStub.called).to.equal(true);
        expect(displayStub.called).to.equal(true);
        done();
      });
    });
  });

  describe('setWindowLocation', function () {
    it('sets window.location', function () {
      var url,
          view;

      view = MetadataView({
        collection: Collection(),
        model: Model()
      });

      url = '#test';
      view.setWindowLocation(url);

      expect(window.location.hash).to.equal('#test');
    });
  });

});
