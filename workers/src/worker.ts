import workersOgHandler from '../../src/utils/workersOgHandler';

addEventListener('fetch', (event) => {
	event.respondWith(workersOgHandler(event.request));
});
