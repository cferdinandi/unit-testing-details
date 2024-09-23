/**
 * The HTML when there is no scuttlebutt
 * @return {String} The HTML string
 */
function getNoDataHTML () {
	return '<p>There be no scuttlebutt to share, matey!</p>';
}

/**
 * The HTML for the list of messages
 * @param  {Object} data The scuttlebutt data
 * @return {String}      The HTML string
 */
function getHTML (data) {
	return `
		<div id="scuttlebutt">
			${data.messages.map(function (msg) {
				return `
					<div class="msg">
						<div class="msg-date">
							<a href="${msg.link}">${msg.date}</a>
						</div>
						<div class="msg-content">${msg.content}</div>
					</div>`;
			}).join('')}
		</div>`;
}

/**
 * Get scuttlebutt data from the API and render UI
 */
function getData () {

	// Get the #app element
	let app = document.querySelector('#app');

	return fetch('https://leanwebclub.com/course-apis/scuttlebutt.json').then(function (response) {
		if (response.ok) {
			return response.json();
		}
		throw response;
	}).then(function (data) {
		app.innerHTML = getHTML(data);
	}).catch(function (error) {
		console.warn(error);
		app.innerHTML = getNoDataHTML();
	});

}


export {getData};