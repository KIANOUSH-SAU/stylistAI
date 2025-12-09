import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

type Props = {
	label: string;
	selected?: boolean;
	onToggle?: (selected: boolean) => void;
};

export default function TagChip({ label, selected = false, onToggle }: Props) {
	const [isSelected, setIsSelected] = useState(selected);
	const scale = useSharedValue(1);

	function toggle() {
		const next = !isSelected;
		setIsSelected(next);
		Haptics.selectionAsync();
		scale.value = withSpring(next ? 1.08 : 1, { damping: 8 });
		setTimeout(() => (scale.value = withSpring(1)), 150);
		onToggle && onToggle(next);
	}

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	return (
		<Animated.View style={[rStyle]}>
			<TouchableOpacity
				onPress={toggle}
				style={[
					styles.chip,
					isSelected ? styles.chipSelected : styles.chipDefault,
				]}
				accessibilityRole="button"
				accessibilityState={{ selected: isSelected }}
			>
				<Text
					style={[
						styles.label,
						isSelected
							? { color: "#0b0c0f", fontWeight: "700" }
							: {},
					]}
				>
					{label}
				</Text>
			</TouchableOpacity>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	chip: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 999,
		margin: 6,
	},
	chipDefault: { backgroundColor: "#111214" },
	chipSelected: { backgroundColor: "#ffd166" },
	label: { color: "#d1d5db" },
});
