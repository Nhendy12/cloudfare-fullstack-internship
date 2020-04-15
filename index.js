const Handler = new HTMLRewriter()

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
 /* */
async function handleRequest(request) {
	//fetch request
	fetch_URL = 'https://cfw-takehome.developers.workers.dev/api/variants';
	let response = await fetch(fetch_URL);
	if(response.ok){

		//gets the array from the url
		const {variants} = await fetch(fetch_URL).then(res => res.json())

		//picks a random number(1 or 0) and pulls a URL from the array
		let rando_variant = (Math.random()>0.5)? 1 : 0;
		let rando_URL = variants[rando_variant];

		//fetch request from the new URL
		let new_URL = await fetch(rando_URL);
		let text = await new_URL.text();

		//makes response returnable html
		const return_res = new Response(text, {
	    	headers: {'Content-Type': 'text/html'}
	  	})
		return Handler.transform(return_res)
		
	}else{
		return new Response("Failed", {
	    headers: { 'content-type': 'text/plain' },
	  	})
	}
}
