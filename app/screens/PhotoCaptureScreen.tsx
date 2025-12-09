import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GhostOverlay from "../../components/GhostOverlay";

/*
  This screen guides 3-step capture: frontal, left profile, right profile.
  After each capture, save the photo and step forward.
*/

export default function PhotoCaptureScreen() {
	const [permission, requestPermission] = useCameraPermissions();
	const [step, setStep] = useState<1 | 2 | 3>(1);
	const cameraRef = useRef<CameraView>(null);
	const router = useRouter();
	const [photos, setPhotos] = useState<string[]>([]);

	if (!permission) {
		// Camera permissions are still loading.
		return <View style={styles.container} />;
	}

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View
				style={[
					styles.container,
					{ justifyContent: "center", alignItems: "center" },
				]}
			>
				<Text
					style={{
						color: "#fff",
						textAlign: "center",
						marginBottom: 20,
					}}
				>
					We need your permission to show the camera
				</Text>
				<TouchableOpacity
					onPress={requestPermission}
					style={{
						padding: 10,
						backgroundColor: "#7c3aed",
						borderRadius: 5,
					}}
				>
					<Text style={{ color: "#fff" }}>Grant Permission</Text>
				</TouchableOpacity>
			</View>
		);
	}

	async function takePicture() {
		if (!cameraRef.current) return;
		try {
			const photo = await cameraRef.current.takePictureAsync({
				quality: 0.9,
				base64: false,
			});

			if (photo) {
				const updatedPhotos = [...photos, photo.uri];
				setPhotos(updatedPhotos);

				if (step === 1) setStep(2);
				else if (step === 2) setStep(3);
				else {
					// Finished
					router.push({
						pathname: "/screens/ProcessingScreen",
						params: { images: JSON.stringify(updatedPhotos) },
					});
				}
			}
		} catch (e) {
			console.error("Failed to take picture:", e);
		}
	}

	return (
		<View style={styles.container}>
			<CameraView style={styles.camera} ref={cameraRef} facing="front">
				<GhostOverlay step={step} />
				<View style={styles.controls}>
					<Text
						style={styles.headerText}
					>{`${step}/3: Align Your Face to the Outline`}</Text>
					<TouchableOpacity
						style={styles.captureBtn}
						onPress={takePicture}
						accessibilityLabel="Capture photo"
					>
						<View style={styles.innerCapture} />
					</TouchableOpacity>
				</View>
			</CameraView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#000" },
	camera: { flex: 1 },
	controls: {
		position: "absolute",
		bottom: 40,
		width: "100%",
		alignItems: "center",
	},
	captureBtn: {
		width: 78,
		height: 78,
		borderRadius: 39,
		borderWidth: 4,
		borderColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	innerCapture: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: "#fff",
	},
	headerText: {
		position: "absolute",
		top: 40,
		alignSelf: "center",
		color: "#fff",
		fontWeight: "700",
	},
});
