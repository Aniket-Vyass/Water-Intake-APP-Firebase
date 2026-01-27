import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final amountController = TextEditingController(text: "hello");
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
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
    );
  }
}
