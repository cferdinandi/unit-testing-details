// Get the loading element
let elem = document.querySelector('[data-loading]');

/**
 * Show loading indicator
 * @param  {String} msg The "loading" message
 */
function loading (msg = 'Loading...') {
	if (!elem) return;
	elem.textContent = msg;
}


export {loading};