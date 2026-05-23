const path = require('path');
const fs = require('fs/promises');
const { Command } = require('commander');

const program = new Command();
const TODOS_PATH = path.join(__dirname, 'todos.json');

async function loadTodos() {
	try {
		const raw = await fs.readFile(TODOS_PATH, 'utf8');
		const data = JSON.parse(raw);
		if (!Array.isArray(data)) {
			throw new Error('todos.json is not an array');
		}
		return data;
	} catch (err) {
		if (err && err.code === 'ENOENT') return [];
		throw err;
	}
}

async function saveTodos(todos) {
	const tmpPath = `${TODOS_PATH}.tmp`;
	const json = JSON.stringify(todos, null, 2);
	await fs.writeFile(tmpPath, json, 'utf8');
	await fs.rename(tmpPath, TODOS_PATH);
}

function nextId(todos) {
	let maxId = 0;
	for (const todo of todos) {
		const id = Number(todo && todo.id);
		if (Number.isFinite(id) && id > maxId) maxId = id;
	}
	return maxId + 1;
}

function parseId(value) {
	const id = Number.parseInt(value, 10);
	if (!Number.isFinite(id) || id <= 0) {
		throw new Error('id must be a positive integer');
	}
	return id;
}

program
	.name('todo')
	.description('Filesystem-based todo list (stores data in todos.json)')
	.version('1.0.0')
	.showHelpAfterError();

program
	.command('add')
	.description('Add a todo')
	.argument('<text...>', 'todo text')
	.action(async (textParts) => {
		const text = textParts.join(' ').trim();
		if (!text) {
			console.error('Todo text cannot be empty.');
			process.exitCode = 1;
			return;
		}

		const todos = await loadTodos();
		const id = nextId(todos);

		todos.push({
			id,
			text,
			done: false,
			createdAt: new Date().toISOString(),
		});

		await saveTodos(todos);
		console.log(`Added todo #${id}`);
	});

program
	.command('delete')
	.description('Delete a todo')
	.argument('<id>', 'todo id to delete')
	.action(async (idValue) => {
		let id;
		try {
			id = parseId(idValue);
		} catch (err) {
			console.error(err.message);
			process.exitCode = 1;
			return;
		}

		const todos = await loadTodos();
		if (todos.length === 0) {
			console.error('No todos found.');
			process.exitCode = 1;
			return;
		}

		const index = todos.findIndex((t) => Number(t && t.id) === id);
		if (index === -1) {
			console.error(`Todo #${id} not found.`);
			process.exitCode = 1;
			return;
		}

		todos.splice(index, 1);
		await saveTodos(todos);
		console.log(`Deleted todo #${id}`);
	});

program
	.command('done')
	.description('Mark a todo as done')
	.argument('<id>', 'todo id to mark as done')
	.action(async (idValue) => {
		let id;
		try {
			id = parseId(idValue);
		} catch (err) {
			console.error(err.message);
			process.exitCode = 1;
			return;
		}

		const todos = await loadTodos();
		if (todos.length === 0) {
			console.error('No todos found.');
			process.exitCode = 1;
			return;
		}

		const todo = todos.find((t) => Number(t && t.id) === id);
		if (!todo) {
			console.error(`Todo #${id} not found.`);
			process.exitCode = 1;
			return;
		}

		if (todo.done) {
			console.log(`Todo #${id} is already done.`);
			return;
		}

		todo.done = true;
		todo.doneAt = new Date().toISOString();
		await saveTodos(todos);
		console.log(`Marked todo #${id} as done`);
	});

program.parseAsync(process.argv).catch((err) => {
	console.error(err && err.message ? err.message : err);
	process.exitCode = 1;
});
