import { useNavigation } from "@react-navigation/native";
import {
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

/*
  Replace View/Text/TouchableOpacity with Gluestack UI components:
  - Box, Text, Button, Avatar, etc.
  Use theme tokens for colors and spacing.
*/

export default function LoginScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />
			<View style={styles.card}>
				{/* Animated logo (Lottie) or static image */}
				<View style={styles.logoWrap}>
					{/* Replace with Lottie for subtle animated texture if available */}
					{/* <LottieView source={require('../../assets/logo-anim.json')} autoPlay loop style={{ width: 80, height: 80 }} /> */}
					{/* <Image
						source={require("../../assets/logo.png")}
						style={styles.logo}
					/> */}
				</View>

				<Text style={styles.title}>Start Your Style Journey</Text>
				<Text style={styles.subtitle}>
					Personalized styles powered by AI — quick, private, and
					tailored to you.
				</Text>

				<TouchableOpacity
					style={[styles.socialButton, styles.googleButton]}
					onPress={() => {
						// TODO: wire up Google sign-in
						navigation.navigate("CurrentLook" as any);
					}}
					accessibilityLabel="Continue with Google"
				>
					<Text style={styles.socialText}>Continue with Google</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.socialButton, styles.githubButton]}
					onPress={() => {
						// TODO: wire up GitHub sign-in
						navigation.navigate("CurrentLook" as any);
					}}
					accessibilityLabel="Sign in with GitHub"
				>
					<Text style={styles.socialText}>Sign in with GitHub</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.cta}
					onPress={() => navigation.navigate("CurrentLook" as any)}
				>
					<Text style={styles.ctaText}>
						Continue without signing in
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0f1115",
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		width: "90%",
		maxWidth: 420,
		borderRadius: 16,
		padding: 24,
		backgroundColor: "#0b0c0f",
		alignItems: "center",
		shadowColor: "#000",
		shadowOpacity: 0.4,
		shadowRadius: 20,
	},
	logoWrap: { marginBottom: 18 },
	logo: { width: 72, height: 72, resizeMode: "contain", tintColor: "#fff" },
	title: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 8,
		textAlign: "center",
	},
	subtitle: {
		color: "#a3a3a8",
		fontSize: 14,
		textAlign: "center",
		marginBottom: 20,
	},
	socialButton: {
		width: "100%",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
		marginVertical: 6,
	},
	googleButton: { backgroundColor: "#fff" },
	githubButton: { backgroundColor: "#24292e" },
	socialText: { fontWeight: "600" },
	cta: { marginTop: 8 },
	ctaText: { color: "#6b7280" },
});
