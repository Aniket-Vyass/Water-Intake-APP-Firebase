import 'dart:convert';
import 'package:water_intake_tracking_app_firebase/home_page.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:water_intake_tracking_app_firebase/models/water_model.dart';

class WaterData extends ChangeNotifier {
  List<WaterModel> waterDataList = [];

  //add water
  void addWater(WaterModel water) async {
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
        'amount': double.parse(water.amount.toString()),
        'unit': 'ml',
        'date': DateTime.now().toString(),
      }),
    );
    notifyListeners();
  }
}
