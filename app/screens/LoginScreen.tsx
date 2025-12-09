import { useRouter } from "expo-router";
import React from "react";
import {
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function LoginScreen(): React.JSX.Element {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle="light-content"
				translucent={false}
				backgroundColor="#0f1115"
			/>

			<View style={styles.card}>
				<View style={styles.logoContainer}>
					{/* <Image
						source={require("../../assets/logo.png")}
						alt="stylistAI logo"
						style={styles.logo}
						resizeMode="contain"
					/> */}
				</View>

				<Text style={styles.title}>Start Your Style Journey</Text>

				<Text style={styles.subtitle}>
					Personalized styles powered by AI — quick, private, and
					tailored to you.
				</Text>

				{/* Full-width social sign-in buttons */}
				<TouchableOpacity
					style={[styles.button, styles.buttonPrimary]}
					onPress={() => {
						// TODO: wire up Google sign-in provider
						router.push("/screens/CurrentLookScreen");
					}}
					accessibilityLabel="Continue with Google"
				>
					<Text style={[styles.buttonText, styles.buttonTextPrimary]}>
						Continue with Google
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.buttonSecondary]}
					onPress={() => {
						// TODO: wire up GitHub sign-in provider
						router.push("/screens/CurrentLookScreen");
					}}
					accessibilityLabel="Sign in with GitHub"
				>
					<Text
						style={[styles.buttonText, styles.buttonTextSecondary]}
					>
						Sign in with GitHub
					</Text>
				</TouchableOpacity>

				<Pressable
					onPress={() => router.push("/screens/CurrentLookScreen")}
					accessibilityLabel="Continue without signing in"
					style={styles.linkButton}
				>
					<Text style={styles.linkText}>
						Continue without signing in
					</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#020617", // slate-950
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	card: {
		width: "100%",
		maxWidth: 420,
		borderRadius: 8,
		padding: 24,
		backgroundColor: "#0f172a", // slate-900
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.1,
		shadowRadius: 15,
		elevation: 10,
	},
	logoContainer: {
		marginBottom: 16,
		alignItems: "center",
		justifyContent: "center",
		height: 84,
		width: 84,
	},
	logo: {
		width: 72,
		height: 72,
	},
	title: {
		color: "#f8fafc", // slate-50
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 8,
		fontSize: 20,
	},
	subtitle: {
		color: "#94a3b8", // slate-400
		textAlign: "center",
		marginBottom: 16,
		fontSize: 14,
	},
	button: {
		width: "100%",
		borderRadius: 6,
		paddingVertical: 12,
		marginBottom: 12,
		alignItems: "center",
	},
	buttonPrimary: {
		backgroundColor: "#f8fafc", // slate-50
		marginBottom: 12,
	},
	buttonSecondary: {
		backgroundColor: "#24292e",
		marginBottom: 8,
	},
	buttonText: {
		fontWeight: "600",
	},
	buttonTextPrimary: {
		color: "#0f172a", // slate-900
	},
	buttonTextSecondary: {
		color: "#f8fafc", // slate-50
	},
	linkButton: {
		marginTop: 8,
	},
	linkText: {
		color: "#94a3b8", // slate-400
		fontSize: 12,
	},
});
