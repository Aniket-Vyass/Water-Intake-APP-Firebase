import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:water_intake_tracking_app_firebase/data/water_data.dart';
import 'package:water_intake_tracking_app_firebase/models/water_model.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final amountController = TextEditingController();
  void saveWater() async {
    Provider.of<WaterData>(context, listen: false).addWater(
      WaterModel(
        amount: double.parse(amountController.text.toString()),
        dateTime: DateTime.now(),
        unit: 'ml',
      ),
    );
  }

  void addWater() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("Add Water"),
        content: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text("Add water to your daily intake"),
            SizedBox(height: 10),
            TextField(
              controller: amountController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: "Amount in ml",
              ),
            ),
          ],
        ),
        //Buttons for the AlertDialog
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              amountController.clear();
            },
            child: Text("Cancel"),
          ),
          TextButton(
            onPressed: () {
              //save data to database
              //saveWater(amountController.text);
              Navigator.pop(context);
            },
            child: Text("Save"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<WaterData>(
      builder: (context, value, child) => Scaffold(
        appBar: AppBar(
          elevation: 4,
          title: Text("Water Intake Tracker"),
          centerTitle: true,
          actions: [IconButton(onPressed: () {}, icon: Icon(Icons.map))],
        ),
        backgroundColor: Theme.of(context).colorScheme.primaryContainer,
        floatingActionButton: FloatingActionButton(
          onPressed: addWater,
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
