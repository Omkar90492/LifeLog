import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() => runApp(LifeLogApp());

class LifeLogApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'LifeLog',
      home: HomeScreen(),
    );
  }
}
