'use strict';

let app = require('./server');
let loopback = require('loopback');
let request = require('supertest');
let bunyan = require('bunyan');
let should = require('chai').should();
let expect = require('chai').expect;
let sinon = require('sinon');

let component = require('../index');

// Test model
let Product = loopback.PersistedModel.extend('product', {
	name: {type: 'string', required: true},
	price: {type: 'number', default: 1}
});

Product.attachTo(loopback.memory());
app.model(Product);

class StreamStub {
	constructor() {
		this.writable = true;
	}

	write() {}
}

let streamStub = new StreamStub();

// register logger
component(app, {
	streams: [
		{
			stream: streamStub,
			type: 'raw'
		}
	]
});

let spy = sinon.spy(streamStub, 'write');

// register middleware
app.use(component.requestLogger({
	msg: '${res.statusCode} ${req.method} ${req.decodedUrl}',
	meta: false
}));
app.use('/api', loopback.rest());
//app.middleware('final', component.failureLogger({}));

describe('middleware', function() {
	beforeEach(function() {
		return Product.create([{name: 'Pera', price: 1}, {name: 'Orange', price: 2}]);
	});

	afterEach(function() {
		spy.resetHistory();
	});

	it('should report GET', function(done) {
		request(app)
			.get('/api/products')
			.query({filter: {where: {name: 'Pera'}}})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(function() {

				expect(spy.calledOnce).to.be.true;

				let entry = spy.firstCall.args[0];

				expect(entry.level).to.equal(30);
				expect(entry.msg).to.equal('200 GET /api/products?filter[where][name]=Pera');
			})
			.expect(200, done);
	});

	it('should report POST', function(done) {
		request(app)
			.post('/api/products')
			.send({name: 'Apples', price: 100})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(function() {

				expect(spy.calledOnce).to.be.true;

				let entry = spy.firstCall.args[0];

				expect(entry.level).to.equal(30);
				expect(entry.msg).to.equal('200 POST /api/products');
			})
			.expect(200, done);
	});

});
