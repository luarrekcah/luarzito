const { getDatabase, ref, push, update, remove, get, set } = require('@firebase/database');

module.exports = {
	createItem: ({ path, params }) => {
		const db = getDatabase();
		if (!path) return { error: 'Sem path' };
		push(ref(db, `luarzito/${path}`), params).then(
			console.log('[LOG] Gravação no banco de dados'),
		).catch((error) => {
			console.warn(error);
		});
	},
	setItem: ({ path, params }) => {
		const db = getDatabase();
		if (!path) return { error: 'Sem path' };
		set(ref(db, `luarzito/${path}`), params).then(
			console.log('[LOG] Gravação no banco de dados'),
		).catch((error) => {
			console.warn(error);
		});
	},
	updateItem: ({ path, params }) => {
		const db = getDatabase();
		if (!path) return { error: 'Sem path' };
		update(ref(db, `luarzito/${path}`),
			params,
		).then(
			console.log('[LOG] Atualização no banco de dados'),
		).catch((error) => {
			console.log(error);
		});
	},
	deleteItem: ({ path }) => {
		const db = getDatabase();
		if (!path) return { error: 'Sem path' };
		remove(ref(db, `luarzito/${path}`))
			.then(
				console.log('[LOG] Remoção no banco de dados'),
			).catch((error) => {
				console.log(error);
			});
	},
	getAllItems: async ({ path }) => {
		const db = getDatabase();
		if (!path) return { error: 'Sem path' };
		const snapshot = await get(ref(db, `luarzito/${path}`));
		const alldata = [];
		snapshot.forEach(childSnapshot => {
			const key = childSnapshot.key,
				data = childSnapshot.val();
			alldata.push({ key, data });
		});
		return alldata;
	},
	getItems: async ({ path }) => {
		const db = getDatabase();
		if (!path) return { error: 'Sem path' };
		const snapshot = await get(ref(db, `luarzito/${path}`));
		return snapshot.val();
	},
};