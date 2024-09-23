/**
 * @jest-environment jsdom
 */

import {getData} from '../api.js';
import 'whatwg-fetch';
import {jest} from "@jest/globals";


describe('The api() method', function () {

	// Generate HTML before each test
	let elem;
	beforeEach(function () {
		document.body.innerHTML = '<div id="app"></div>';
		elem = document.querySelector('#app');
	});

	// Watch for API calls
	jest.spyOn(window, 'fetch');

	// Setup mock response
	window.fetch.mockResolvedValue({
		ok: true,
		json: async function () {
			return {
				"service": "Scuttlebutt",
				"username": "cannonball",
				"messages": [
					{
						"content": "In the market for a new telescope. 🔭 Any recommendations?",
						"date": "November 1, 1784",
						"link": "https://scuttlebutt.com/cannonball/"
					},
					{
						"content": "Happy Halloween! 🎃 Dressed up as Blackbeard this year. 🏴‍☠️ Love ya, bro!",
						"date": "October 31, 1784",
						"link": "https://scuttlebutt.com/cannonball/"
					}
				]
			};
		},
	});

	test('the scuttlebutt API was called', async function () {
		await getData();
		expect(window.fetch).toHaveBeenCalledWith('https://leanwebclub.com/course-apis/scuttlebutt.json');
	});

	test('content is displayed in the UI', async function () {
		await getData();
		expect(elem.innerHTML).not.toHaveLength(0);
	});

	test('no content is displayed on API error', async function () {

		// Setup mock response
		window.fetch.mockResolvedValueOnce({
			ok: false,
			json: async function () {
				return {msg: 'Something went wrong'};
			},
		});

		await getData();
		expect(elem.querySelector('#scuttlebutt')).toBeFalsy();

	});

});