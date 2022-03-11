import 'package:flutter/material.dart';
import 'package:food_ridder/page/qrCodeGenerator.dart';
import 'package:food_ridder/page/qrCodeScreen.dart';
import 'package:food_ridder/widgets/simple_app_bar.dart';

class BarcodeScannerScreen extends StatefulWidget {
  const BarcodeScannerScreen({Key? key}) : super(key: key);

  @override
  _BarcodeScannerScreenState createState() => _BarcodeScannerScreenState();
}

class _BarcodeScannerScreenState extends State<BarcodeScannerScreen> {
  int _selectedIndex = 0;
  List<Widget> _widgetOptions = <Widget>[QrCodeScanner(), QrCodeGenerator()];
  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: Center(child: _widgetOptions.elementAt(_selectedIndex)),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Color(0xFF313131),
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.qr_code_scanner), title: Text("Scan Qr Code"),),
          BottomNavigationBarItem(
            icon: Icon(Icons.qr_code), title: Text("Create Qr Code"),)
        ],
        type: BottomNavigationBarType.fixed,
        currentIndex: _selectedIndex,
        unselectedItemColor: Colors.white,
        selectedItemColor: Color(0xFF5fa693),
        iconSize: 30,
        onTap: _onItemTapped,
        elevation: 5,
      ),
    );
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex= index;

    });
  }
}