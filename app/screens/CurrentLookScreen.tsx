import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Animated,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
/*
  Replace with Gluestack Box/Text/Progress/Carousel primitives.
  Provide stylized head images under /assets/head-*.png
*/

const faceShapes = [
	{ id: "oval", label: "Oval", src: require("../../assets/images/head.png") },
	{
		id: "square",
		label: "Square",
		src: require("../../assets/images/head.png"),
	},
	{
		id: "round",
		label: "Round",
		src: require("../../assets/images/head.png"),
	},
	{
		id: "heart",
		label: "Heart",
		src: require("../../assets/images/head.png"),
	},
	{
		id: "diamond",
		label: "Diamond",
		src: require("../../assets/images/head.png"),
	},
	{
		id: "oblong",
		label: "Oblong",
		src: require("../../assets/images/head.png"),
	},
];

export default function CurrentLookScreen() {
	const navigation = useNavigation();
	const [step, setStep] = useState(1); // 1..3
	const [selectedFace, setSelectedFace] = useState<string | null>(null);
	const scale = useRef(new Animated.Value(1)).current;
	const router = useRouter();

	function onSelectFace(id: string) {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		setSelectedFace(id);
		Animated.sequence([
			Animated.timing(scale, {
				toValue: 1.06,
				duration: 120,
				useNativeDriver: true,
			}),
			Animated.timing(scale, {
				toValue: 1,
				duration: 120,
				useNativeDriver: true,
			}),
		]).start();
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Current Look</Text>
				<Text style={styles.progressText}>{step}/3</Text>
			</View>

			<View style={styles.progressBar}>
				<View
					style={[
						styles.progressFill,
						{ width: `${(step / 3) * 100}%` },
					]}
				/>
			</View>

			{/* Step content - for now we show Face Shape selector for step 1 */}
			<View style={styles.content}>
				<Text style={styles.question}>Face Shape</Text>
				<FlatList
					data={faceShapes}
					keyExtractor={(i) => i.id}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16 }}
					renderItem={({ item }) => {
						const isSelected = selectedFace === item.id;
						return (
							<TouchableOpacity
								onPress={() => onSelectFace(item.id)}
								style={[
									styles.faceCard,
									isSelected && styles.faceSelected,
								]}
								accessibilityLabel={`Select ${item.label} face shape`}
							>
								<Animated.View
									style={{
										transform: [
											{ scale: isSelected ? scale : 1 },
										],
									}}
								>
									<Image
										source={item.src}
										style={styles.faceImage}
									/>
									<Text
										style={[
											styles.faceLabel,
											isSelected && { color: "#fff" },
										]}
									>
										{item.label}
									</Text>
								</Animated.View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>

			<View style={styles.footer}>
				<TouchableOpacity
					style={[
						styles.continueBtn,
						{ opacity: selectedFace ? 1 : 0.6 },
					]}
					disabled={!selectedFace}
					onPress={() => {
						setStep(2);
						router.push("/screens/PreferredLookScreen");
					}}
				>
					<Text style={styles.continueText}>Continue</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#0f1115", paddingTop: 48 },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		marginBottom: 8,
	},
	headerText: { color: "#fff", fontSize: 20, fontWeight: "700" },
	progressText: { color: "#9ca3af" },
	progressBar: {
		height: 6,
		backgroundColor: "#111216",
		marginHorizontal: 20,
		borderRadius: 6,
		overflow: "hidden",
	},
	progressFill: { height: "100%", backgroundColor: "#7c3aed" },
	content: { marginTop: 20 },
	question: {
		color: "#d1d5db",
		fontSize: 16,
		marginLeft: 20,
		marginBottom: 12,
	},
	faceCard: {
		width: 120,
		height: 160,
		backgroundColor: "#09090b",
		borderRadius: 12,
		marginRight: 12,
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
	},
	faceSelected: { borderWidth: 3, borderColor: "#7c3aed" },
	faceImage: {
		width: 64,
		height: 64,
		resizeMode: "contain",
		marginBottom: 10,
	},
	faceLabel: { color: "#9ca3af" },
	footer: { padding: 20 },
	continueBtn: {
		backgroundColor: "#7c3aed",
		paddingVertical: 14,
		alignItems: "center",
		borderRadius: 12,
	},
	continueText: { color: "#fff", fontWeight: "700" },
});
