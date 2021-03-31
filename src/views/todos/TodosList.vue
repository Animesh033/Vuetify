<template>
	<div>
		<v-data-table
			:headers="headers"
			:items="todos"
			:options.sync="options"
			:server-items-length="totalTodos"
			:loading="loading"
			class="elevation-1"
		></v-data-table>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				totalTodos: 0,
				todos: [],
				loading: true,
				options: {},
				headers: [
					{
						text: "Id",
						align: "start",
						// sortable: false,
						value: "id",
					},
					{ text: "Title", value: "title" },
					{ text: "User Id", value: "userId" },
					{ text: "Completed", value: "completed" },
				],
			};
		},
		watch: {
			options: {
				handler() {
					this.getDataFromApi();
				},
				deep: true,
			},
		},
		mounted() {
			this.getDataFromApi();
		},
		methods: {
			getDataFromApi() {
				this.loading = true;
				this.makeApiCall().then((data) => {
					console.log(data.items);
					this.todos = data.items;
					this.totalTodos = data.total;
					this.loading = false;
				});
			},
			async makeApiCall() {
				await this.$store.dispatch("loadTodos");
				const { sortBy, sortDesc, page, itemsPerPage } = this.options;

				let items = this.$store.getters["getTodos"];
				const total = items.length;
				this.sortTodos(items, sortBy, sortDesc);
				if (itemsPerPage > 0) {
					items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
				}
				return new Promise((resolve, reject) => {
					console.log(reject);
					setTimeout(() => {
						resolve({
							items,
							total,
						});
					}, 1000);
				});
			},
			sortTodos(items, sortBy, sortDesc) {
				if (sortBy.length === 1 && sortDesc.length === 1) {
					items = items.sort((a, b) => {
						const sortA = a[sortBy[0]];
						const sortB = b[sortBy[0]];

						if (sortDesc[0]) {
							if (sortA < sortB) return 1;
							if (sortA > sortB) return -1;
							return 0;
						} else {
							if (sortA < sortB) return -1;
							if (sortA > sortB) return 1;
							return 0;
						}
					});
				}
			},
		},
	};
</script>
<style>
</style>