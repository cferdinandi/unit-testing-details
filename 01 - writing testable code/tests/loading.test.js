/**
 * @jest-environment jsdom
 */

import {loading} from '../loading.js';

describe('The loading() method', function () {

	test('loading message is displayed in the UI', function () {

		// Generate HTML
		document.body.innerHTML = '<div data-loading aria-live="polite"></div>';

		// Test conditions
		loading();
		let elem = document.querySelector('[data-loading]');
		expect(elem.textContent).not.toHaveLength(0);

	});

});