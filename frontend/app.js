document.getElementById('pageAButton').addEventListener('click', loadPageA);
document.getElementById('pageBButton').addEventListener('click', loadPageB);

function loadPageA() {
	document.getElementById('content').innerHTML = `
		<h2>Submit a Comment</h2>
		<form id="commentForm">
			<div class="mb-3">
				<label for="name" class="form-label">Name</label>
				<input type="text" class="form-control" id="name" required>
			</div>
			<div class="mb-3">
				<label for="comment" class="form-label">Comment</label>
				<textarea class="form-control" id="comment" rows="3" required></textarea>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
		<p>Total Comments: <span id="commentCount">0</span></p>
	`;

	fetch('http://localhost:8000/api/comments/count')
		.then(response => response.json())
		.then(data => {
			document.getElementById('commentCount').textContent = data.count;
		});

	document.getElementById('commentForm').addEventListener('submit', function(e) {
		e.preventDefault();
		const name = document.getElementById('name').value;
		const comment = document.getElementById('comment').value;

		fetch('http://localhost:8000/api/comments/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: name, comment: comment }),
		}).then(() => loadPageA());
	});
}

function loadPageB() {
	fetch('http://localhost:8001/api/comments/')
		.then(response => response.json())
		.then(data => {
			document.getElementById('content').innerHTML = `
				<h2>All Comments</h2>
				<ul id="commentList" class="list-group"></ul>
			`;
			const commentList = document.getElementById('commentList');
			data.forEach(comment => {
				const li = document.createElement('li');
				li.className = 'list-group-item';
				li.textContent = `${comment.name}: ${comment.comment}`;
				commentList.appendChild(li);
			});
		});
}

// Load Page A by default
loadPageA();
