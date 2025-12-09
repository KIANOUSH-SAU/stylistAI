import React from "react";
import { StyleSheet, Text, View } from "react-native";

/*
  Simple Ghost Overlay. In production replace with an SVG outline or PNG with alpha.
  Consider using react-native-svg for scalable outlines.
  The overlay assumes absolute positioning on top of Camera preview.
*/

type Props = {
	step: 1 | 2 | 3;
};

export default function GhostOverlay({ step }: Props) {
	// You can rotate or switch outline per step
	const outlineColor = "rgba(120, 255, 180, 0.65)";
	return (
		<View pointerEvents="none" style={styles.overlay}>
			<View style={[styles.ghost, { borderColor: outlineColor }]}>
				{/* Placeholder for an outline head - use an SVG for production */}
			</View>
			<View style={styles.instruction}>
				<Text
					style={styles.instructionText}
				>{`${step}/3: Align Your Face to the Outline`}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
	},
	ghost: {
		width: 240,
		height: 320,
		borderRadius: 160,
		borderWidth: 2.5,
		backgroundColor: "rgba(255,255,255,0.02)",
	},
	instruction: { position: "absolute", top: 40 },
	instructionText: { color: "#d1fae5", fontWeight: "700" },
});
