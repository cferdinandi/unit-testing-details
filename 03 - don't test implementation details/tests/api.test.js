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
		expect(elem.innerHTML).toBe('\n\t\t<div id="scuttlebutt">\n\t\t\t\n\t\t\t\t\t<div class="msg">\n\t\t\t\t\t\t<div class="msg-date">\n\t\t\t\t\t\t\t<a href="https://scuttlebutt.com/cannonball/">November 1, 1784</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="msg-content">In the market for a new telescope. 🔭 Any recommendations?</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="msg">\n\t\t\t\t\t\t<div class="msg-date">\n\t\t\t\t\t\t\t<a href="https://scuttlebutt.com/cannonball/">October 31, 1784</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="msg-content">Happy Halloween! 🎃 Dressed up as Blackbeard this year. 🏴‍☠️ Love ya, bro!</div>\n\t\t\t\t\t</div>\n\t\t</div>');
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
		expect(elem.innerHTML).toBe('<p>There be no scuttlebutt to share, matey!</p>');

	});

});