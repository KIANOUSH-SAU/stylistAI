import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import {
	Image,
	Pressable,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
	const router = useRouter();

	const [request, response, promptAsync] = Google.useAuthRequest({
		// Use the Web Client ID for Expo Go / Web
		clientId:
			"836157799384-c9msnh8u4fvhphkvbrevavkuf10ti98d.apps.googleusercontent.com",
		// For native (if you ever build it), you'd add iosClientId / androidClientId here
	});

	useEffect(() => {
		if (response?.type === "success") {
			const { authentication } = response;
			console.log("Success:", authentication);
			// Navigate on success
			router.push("/screens/CurrentLookScreen");
		}
	}, [response]);

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle="light-content"
				translucent={false}
				backgroundColor="#0f1115"
			/>

			<View style={styles.card}>
				<View style={styles.logoContainer}>
					<Image
						source={require("../../assets/images/logo.png")}
						alt="stylistAI logo"
						style={styles.logo}
						resizeMode="contain"
					/>
				</View>

				<Text style={styles.title}>Start Your Style Journey</Text>

				<Text style={styles.subtitle}>
					Personalized styles powered by AI
				</Text>

				<TouchableOpacity
					style={[styles.button, styles.buttonPrimary]}
					disabled={!request}
					onPress={() => {
						promptAsync();
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
