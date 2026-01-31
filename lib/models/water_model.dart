import 'dart:convert';

import 'package:http/http.dart' as http;

class WaterModel {
  final String? id;
  final double amount;
  final DateTime dateTime;
  final String unit;

  WaterModel({
    this.id,
    required this.amount,
    required this.dateTime,
    required this.unit,
  });

  factory WaterModel.fromMap(Map<String, dynamic> json, String id) {
    return WaterModel(
      id: id,
      amount: json['amount'],
      dateTime: DateTime.parse(json['dateTime']),
      unit: json['unit'],
    );
  }

  //convert watermodel to json for sending data to firebase
  Map<String, dynamic> toJson() {
    return {'amount': amount, 'dateTime': DateTime.now()};
  }

  Future<List<WaterModel>> fetchWaterData() async {
    //fetch water data from firebase
    final url = Uri.https(
      'water-intake-app-e76bf-default-rtdb.asia-southeast1.firebasedatabase.app',
      'water.json',
    );
    var response = await http.get(url);
    final Map<String, dynamic> extractedData = json.decode(response.body);
    final List<WaterModel> loadedWaterData = [];
    extractedData.forEach((waterId, waterData) {
      loadedWaterData.add(
        WaterModel(
          id: waterId,
          amount: waterData['amount'],
          dateTime: DateTime.parse(waterData['date']),
          unit: waterData['unit'],
        ),
      );
    });
    return loadedWaterData;
  }
}
