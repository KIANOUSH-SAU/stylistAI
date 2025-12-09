import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProcessingScreen() {
	const { images } = useLocalSearchParams();
	const router = useRouter();

	const imageList = typeof images === "string" ? JSON.parse(images) : [];

	useEffect(() => {
		// Simulate processing
		const timer = setTimeout(() => {
			// Navigate to results or home
			// router.push("/screens/ResultsScreen");
			console.log("Processing complete");
		}, 3000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Processing Your Style...</Text>
			<View style={styles.imageRow}>
				{imageList.map((uri: string, index: number) => (
					<Image key={index} source={{ uri }} style={styles.thumb} />
				))}
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
	title: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	imageRow: {
		flexDirection: "row",
		gap: 10,
	},
	thumb: {
		width: 80,
		height: 80,
		borderRadius: 8,
		backgroundColor: "#333",
	},
});
