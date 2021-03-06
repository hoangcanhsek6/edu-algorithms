import test from "ava";
import Heap from "./Heap.js";
import Queue from "./Queue.js";
import DoubleEndedQueue from "./DoubleEndedQueue.js";
import gcd from "./gcd.js";

const PULL = -100500;
const PULL_LAST = 100500;

[
	[
		[1,PULL,2,PULL_LAST,1,3,7,PULL_LAST,PULL,PULL],
		[
			[undefined, undefined],
			[1, 1],
			[undefined, undefined],
			[2, 2],
			[undefined, undefined],
			[1, 1],
			[1, 3],
			[1, 7],
			[1, 3],
			[3, 3],
			[undefined, undefined]
		]
	]
].forEach(([dos, compares]) => test(`DoubleEndedQueue test`, (t) => {

	const queue = new DoubleEndedQueue();

	t.is(queue.isEmpty(), true);

	for (let i = 0; i < compares.length; ++i) {
		if (typeof compares[i][0] !== "undefined")
			t.is(queue.isEmpty(), false);
		t.is(queue.peek(), compares[i][0]);
		t.is(queue.peekLast(), compares[i][1]);
		if (i !== compares.length - 1) {
			if (dos[i] === PULL)
				queue.pull();
			else if (dos[i] === PULL_LAST)
				queue.pullLast();
			else
				queue.add(dos[i]);
		}
	}

	t.is(queue.isEmpty(), true);

}));

[
	[[3,1,5,8,0], [3,1,1,1,0]],
	[[6,8,4,7,2,-1], [6,6,4,4,2,-1]]
].forEach(([toHeap, res]) => test(`Min heap: heapify [${ toHeap }], get ${ res }`, (t) => {

	const comp = (a, b) => a - b;
	const minHeap = new Heap(comp);

	for (let i = 0; i < res.length; ++i) {
		minHeap.add(toHeap[i]);
		t.is(minHeap.peak(), res[i]);
	}

	t.is(minHeap.size(), res.length);

	const sorted = toHeap.slice().sort(comp);

	for (let i = 0; i < res.length; ++i) {
		t.is(minHeap.poll(), sorted[i]);
	}

	t.is(minHeap.size(), 0);
	t.is(minHeap.poll(), undefined);

}));

[
	[[3,1,5,8,0], [3,3,5,8,8]],
	[[6,8,4,7,2,-1,9], [6,8,8,8,8,8,9]]
].forEach(([toHeap, res]) => test(`Max heap: heapify [${ toHeap }], get ${ res }`, (t) => {

	const comp = (a, b) => b - a;
	const maxHeap = new Heap(comp);

	for (let i = 0; i < res.length; ++i) {
		maxHeap.add(toHeap[i]);
		t.is(maxHeap.peak(), res[i]);
	}

	t.is(maxHeap.size(), res.length);

	const sorted = toHeap.slice().sort(comp);

	for (let i = 0; i < res.length; ++i) {
		t.is(maxHeap.poll(), sorted[i]);
	}

	t.is(maxHeap.size(), 0);
	t.is(maxHeap.poll(), undefined);

}));

[
	[[1,2,-1,null,null,5,null], [1,1,1,1,2,-1,-1,5]]
].forEach(([acts, tops]) => test(`Queue: from [${ acts }], get ${ tops }`, (t) => {

	const queue = new Queue();

	let i = 0;

	for (; i < acts.length; ++i) {
		if (acts[i] !== null) {
			queue.add(acts[i]);
			t.is(queue.first(), tops[i]);
		} else {
			t.is(queue.pull(), tops[i]);
		}
	}

	for (; i < tops.length; ++i) {
		t.is(queue.pull(), tops[i]);
	}

	t.is(queue.pull(), undefined);

}));

[
	[2, 3, 1],
	[100, 200, 100],
	[5, 11, 1],
	[21, 6, 3]
].forEach(([a, b, res]) => test(`GCD(${ a }, ${ b }) must be ${ res }`, (t) => {

	t.is(gcd(a, b), res);

}));
