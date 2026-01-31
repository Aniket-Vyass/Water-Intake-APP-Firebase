import "package:flutter/material.dart";
import 'package:provider/provider.dart';
import 'package:water_intake_tracking_app_firebase/data/water_data.dart';
import 'package:water_intake_tracking_app_firebase/home_page.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => WaterData(),
      child: MaterialApp(
        title: "Water Intake Tracker Firebase",
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: HomePage(),
      ),
    );
  }
}
