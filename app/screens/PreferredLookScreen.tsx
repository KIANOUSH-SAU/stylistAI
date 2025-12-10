import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import TagChip from "../../components/TagChip";

/*
  Replace with Gluestack Chip/Badge and layout primitives.
  Keep grouped headings and disable continue until enough selected.
*/

const groups = {
	Vibe: [
		"Edgy",
		"Classic",
		"Bohemian",
		"Minimalist",
		"Avant-Garde",
		"Sporty",
	],
	Maintenance: [
		"Low Maintenance",
		"High Maintenance",
		"Occasional Styling",
		"Daily Styling",
	],
	"Length Preference": ["Short", "Medium", "Long"],
};

export default function PreferredLookScreen() {
	const [step, setStep] = useState(2);
	const [selected, setSelected] = useState<Record<string, boolean>>({});
	const router = useRouter();
	function toggleTag(tag: string, value: boolean) {
		setSelected((prev) => ({ ...prev, [tag]: value }));
	}

	const selectedCount = Object.values(selected).filter(Boolean).length;
	const canContinue = selectedCount >= 3;

	return (
		<>
			<View style={styles.header}>
				<Text style={styles.headerText}>Preferred Look</Text>
				<Text style={styles.progressText}>{step}/3</Text>
			</View>
			<View style={styles.container}>
				<Text style={styles.sub}>
					Tap tags to describe what you want — pick at least 3.
				</Text>
				<ScrollView contentContainerStyle={{ padding: 20 }}>
					{Object.entries(groups).map(([heading, tags]) => (
						<View key={heading} style={{ marginBottom: 14 }}>
							<Text style={styles.groupHeading}>{heading}</Text>
							<View style={styles.chipsRow}>
								{tags.map((t) => (
									<TagChip
										key={t}
										label={t}
										selected={!!selected[t]}
										onToggle={(val) => toggleTag(t, val)}
									/>
								))}
							</View>
						</View>
					))}
				</ScrollView>

				<View style={styles.footer}>
					<TouchableOpacity
						style={[
							styles.continueBtn,
							{ opacity: canContinue ? 1 : 0.6 },
						]}
						disabled={!canContinue}
						onPress={() =>
							router.push("/screens/PhotoCaptureScreen")
						}
					>
						<Text style={styles.continueText}>
							Continue ({selectedCount})
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.progressBar}>
					<View
						style={[
							styles.progressFill,
							{ width: `${(step / 3) * 100}%` },
						]}
					/>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#0f1115",
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		height: 60,
		alignItems: "center",
	},
	headerText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "700",
	},
	progressText: { color: "#9ca3af" },
	sub: { color: "#9ca3af", paddingHorizontal: 20, marginTop: 4 },
	groupHeading: { color: "#d1d5db", fontWeight: "700", marginBottom: 8 },
	chipsRow: { flexDirection: "row", flexWrap: "wrap" },
	footer: { padding: 20 },
	continueBtn: {
		backgroundColor: "#7c3aed",
		paddingVertical: 14,
		alignItems: "center",
		borderRadius: 12,
	},
	progressBar: {
		height: 6,
		backgroundColor: "#111216",
		marginHorizontal: 20,
		borderRadius: 6,
		overflow: "hidden",
	},
	progressFill: { height: "100%", backgroundColor: "#7c3aed" },
	continueText: { color: "#fff", fontWeight: "700" },
});
