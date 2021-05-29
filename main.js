document.addEventListener('DOMContentLoaded', () => {
	document.body.innerHTML = `
	<div class='nav'>
	<h1>Tic-Tac-Toe Colored</h1>
	<ul>
	<li style="color:#cabbe9">player1</li>
	<li style = "color:#ffcef3">player2</li>
	</ul>
	</div>
	<div class="parent">
		<div class="subparent">
		</div>
	</div>
	`;
	let nav = document.querySelector('.nav');
	nav.style.color = 'white';
	nav.style.backgroundColor = 'black';
	nav.style.position = 'absolute';
	nav.style.top = '0px';
	nav.style.left = '0px';
	nav.style.padding = '0.2vw';
	nav.style.width = '100vw';
	nav.style.display = 'flex';
	nav.style.margin = '0px';
	let h2 = nav.querySelector('h1');
	h2.style.justifySelf = 'left';
	h2.style.margin = '0.5vw';
	let ul = nav.querySelector('ul');
	ul.style.listStyle = 'none';
	ul.style.position = 'absolute';
	ul.style.top = '0px';
	ul.style.right = '3vw';
	ul.style.display = 'flex';
	ul.querySelectorAll('li').forEach((v) => {
		v.style.margin = '0 1vw';
		v.style.fontSize = '120%';
	});
	let parent = document.querySelector('.parent');
	let subparent = document.querySelector('.subparent');
	subparent.style.backgroundColor = '#002651';
	document.body.style = 'flex';
	document.body.justifyContent = 'center';
	parent.style.margin = '5vw auto';
	parent.style.width = '50vw';
	parent.style.height = '50vw';
	subparent.style.width = '35vw';
	subparent.style.height = '35vw';
	parent.style.display = 'flex';
	parent.style.flexDirection = 'column';
	parent.style.alignItems = 'center';
	subparent.style.display = 'grid';
	subparent.style.gridGap = '1%';
	subparent.style.gridTemplateColumns = 'repeat(3,1fr)';
	subparent.style.gridTemplateRows = 'repeat(3,1fr)';
	subparent.style.borderRadius = '3vw';
	document.body.style.background =
		'linear-gradient(to right, rgb(127, 127, 213), rgb(134, 168, 231), rgb(145, 234, 228))';
	for (let i = 1; i < 10; i++) {
		let main = document.createElement('div');
		main.className = 'inner';
		main.setAttribute(`data-value`, '0');
		subparent.appendChild(main);
		if (i == 5) {
			let para = document.createElement('p');
			para.className = 'instruction';
			para.textContent = 'please click on a box to select';
			para.style.color = '#002651';
			para.style.margin = '1vw';
			main.appendChild(para);
			para.style.fontSize = 'min(200% , 1vw)';
			para.style.opacity = '0.6';
		}
		main.style.display = 'grid';
		main.style.placeItems = 'center';
	}
	let inner = document.querySelectorAll('.inner');
	inner.forEach((v) => {
		v.style.borderRadius = '1vw';
		v.style.backgroundColor = '#dee1ec';
		v.style.cursor = 'pointer';
	});
	document.querySelectorAll('.instruction').forEach((v) => {
		setTimeout(() => {
			v.style.opacity = '0.2';
		}, 1000);
	});

	document.querySelectorAll('.instruction').forEach((v) => {
		setTimeout(() => {
			v.style.visibility = 'hidden';
		}, 2000);
	});
	let count = 0;
	let announce = document.createElement('h1');
	parent.appendChild(announce);
	announce.className = 'last';
	announce.style.margin = '2vw';
	announce.style.letterSpacing = '150%';
	announce.textContent = '';
	let button = document.createElement('input');
	button.type = 'button';
	button.value = 'Play Again';
	parent.appendChild(button);
	button.style.visibility = 'hidden';
	button.style.backgroundColor = '#002651';
	button.style.width = '40%';
	button.style.height = '10%';
	button.style.fontSize = 'min( 3vw , 200%)';
	button.style.color = 'white';
	let keyframes = [
		{ color: '#5d13e7' },
		{ color: '#4b89ac' },
		{ color: '#824c96' },
		{ color: '#000000' },
		{ color: 'red' }
	];
	subparent.addEventListener('click', (event) => {
		if (event.target.getAttribute('data-value') == '0') {
			let v = event.target;
			let result = 0;
			if (v.className == 'inner') {
				count++;
				v.style.transform = 'scale(0.98)';
				setTimeout(() => {
					v.style.transform = 'scale(1)';
				}, 100);
				if (count % 2) {
					v.style.backgroundColor = '#cabbe9';
					v.setAttribute('data-value', '1');
				} else {
					v.style.background = '#ffcef3';
					v.setAttribute('data-value', '2');
				}
			}
			let out = [];
			let num = 0;
			let sub = [];
			let value = document.querySelectorAll('.inner');
			for (let k of value) {
				num++;
				if (num % 3) sub.push(k.getAttribute('data-value'));
				else {
					sub.push(k.getAttribute('data-value'));
					out.push(sub);
					sub = [];
				}
			}
			function equality(a, b, c) {
				return a == b && b == c ? true : false;
			}
			for (let i = 0; i < 3; i++) {
				if (equality(out[i][0], out[i][1], out[i][2]) && out[i][0] != '0') result = 1;
			}
			for (let i = 0; i < 3; i++) {
				if (equality(out[0][i], out[1][i], out[2][i]) && out[0][i] != '0') result = 1;
			}
			if (
				(equality(out[0][0], out[1][1], out[2][2]) && out[0][0] != '0') ||
				(equality(out[0][2], out[1][1], out[2][0]) && out[1][1] != '0')
			)
				result = 1;
			if (result) {
				if (count % 2) announce.textContent = 'Player-1 won';
				else announce.textContent = 'player-2 won';
				announce.animate(keyframes, {
					duration: 1000,
					iterations: Infinity
				});
			} else if (!result && count == 9) announce.textContent = "It's a draw";
			if (announce.textContent == '') button.style.visibility = 'hidden';
			else {
				button.style.visibility = 'visible';
				button.autofocus = '';
			}
			button.addEventListener('click', () => {
				window.location.reload();
			});
		}
	});
});
