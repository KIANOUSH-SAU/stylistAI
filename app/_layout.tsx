import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
	anchor: "screens",
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	return (
		<ThemeProvider
			value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<Stack>
				{/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
				<Stack.Screen
					name="screens/LoginScreen"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="screens/CurrentLookScreen"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="screens/PreferredLookScreen"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="screens/PhotoCaptureScreen"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="screens/ProcessingScreen"
					options={{ headerShown: false }}
				/>
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
