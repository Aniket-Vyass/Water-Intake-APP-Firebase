import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final amountController = TextEditingController();

  void saveWater(String amount) async {
    final url = Uri.https(
      'water-intake-app-e76bf-default-rtdb.asia-southeast1.firebasedatabase.app',
      'water.json',
    );
    //now that we have the URL we would like to post something to our database
    // to post the data the post() fuc needs a url that is URI type and a body which is the data we want to post
    // that's why we converted the normal http final url to Uri.https()
    var response = await http.post(
      //response
      url,
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'amount': double.parse(amount),
        'unit': 'ml',
        'date': DateTime.now().toString(),
      }),
    );
    //checking if response.statuscode == 200,
    if (response.statusCode == 200) {
      //Now, if it's 200,which means succesfully executed, we pass a print stmt for ourselves to know if successfuly saved
      print('Data Saved');
    } else {
      print('Data not Saved');
    }
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
              saveWater(amountController.text);
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
