<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40"
				/>

				<v-img
					alt="Vuetify Name"
					class="shrink mt-1 hidden-sm-and-down"
					contain
					min-width="100"
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
					width="100"
				/>
			</div>

			<v-spacer></v-spacer>

			<v-btn @click="logout" text v-if="isLoggedIn">
				<span class="mr-2">Logout</span>
				<!-- <v-icon>mdi-open-in-new</v-icon> -->
			</v-btn>
			<v-btn href="/login" text v-else>
				<span class="mr-2">Login</span>
				<!-- <v-icon>mdi-open-in-new</v-icon> -->
			</v-btn>
		</v-app-bar>

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
	// import HelloWorld from "./components/HelloWorld";

	export default {
		// name: "App",
		// components: {
		// 	HelloWorld,
		// },
		// data: () => ({
		// 	//
		// }),
		computed: {
			isLoggedIn() {
				return this.$store.getters.isAuthenticated;
			},
		},
		methods: {
			logout() {
				this.$store.dispatch("logout");
				this.$router.replace("/");
			},
		},
		created() {
			console.log(process.env.VUE_APP_BASE_URL);
		},
		mounted() {
			// fetch("https://jsonplaceholder.typicode.com/users/1") //1
			// 	.then((response) => response.json()) //2
			// 	.then((user) => {
			// 		console.log(user); //3
			// 	});
		},
	};
</script>
