// ignore_for_file: public_member_api_docs, sort_constructors_first
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
}

factory WaterModel.fromMap(Map<String, dynamic> map) {
  return WaterModel(
    id: map['id'],
    amount: map['amount'],
    dateTime: DateTime.parse(map['dateTime']),
    unit: json['unit']
  );
}

//convert watermodel to json for sending data to firebase
Map<String, dynamic> toMap() {
  return {
    'id': id,
    'amount': amount,
    'dateTime': DateTime.now(),
    'unit': unit,
  };
}