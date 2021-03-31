<template>
	<v-container>
		<v-form ref="form" v-model="valid" lazy-validation>
			<v-text-field
				v-model="email"
				:rules="emailRules"
				label="E-mail"
				required
			></v-text-field>

			<v-text-field
				v-model="password"
				:counter="10"
				:rules="passwordRules"
				:type="'password'"
				label="Pasword"
				required
			></v-text-field>

			<v-btn :disabled="!valid" color="success" class="mr-4" @click="authLogin">
				{{ submitButtonCaption }}
			</v-btn>
			<v-btn color="light" class="mr-4" @click="switchAuthMode">{{
				switchModeButtonCaption
			}}</v-btn>
		</v-form>
	</v-container>
</template>

<script>
	export default {
		data: () => ({
			valid: true,
			email: "",
			emailRules: [
				(v) => !!v || "E-mail is required",
				(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
			],
			password: "",
			passwordRules: [
				(v) => !!v || "Password is required",
				(v) =>
					(v && v.length >= 6) || "Password must be greater than 6 characters",
			],
			mode: "login",
		}),
		computed: {
			submitButtonCaption() {
				if (this.mode === "login") {
					return "Login";
				} else {
					return "Signup";
				}
			},
			switchModeButtonCaption() {
				if (this.mode === "login") {
					return "Signup instead";
				} else {
					return "Login instead";
				}
			},
		},
		methods: {
			async authLogin() {
				this.$refs.form.validate();
				const actionPayload = {
					email: this.email,
					password: this.password,
				};
				try {
					if (this.mode === "login") {
						await this.$store.dispatch("login", actionPayload);
					} else {
						await this.$store.dispatch("signup", actionPayload);
					}
					const redirectUrl = "" + (this.$route.query.redirect || "todos");
					this.$router.push(redirectUrl);
				} catch (err) {
					this.error = err.message || "Failed to authenticate, try later.";
				}
			},
			switchAuthMode() {
				if (this.mode === "login") {
					this.mode = "signup";
				} else {
					this.mode = "login";
				}
			},
		},
	};
</script>

<style>
</style>