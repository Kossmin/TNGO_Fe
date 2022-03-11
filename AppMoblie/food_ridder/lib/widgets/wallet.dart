import 'package:flutter/material.dart';
import 'package:food_ridder/mainScreen/card_screen.dart';
import 'package:food_ridder/mainScreen/home_wallet_screen.dart';

class Wallet extends StatefulWidget {

  @override
  _WalletState createState() => _WalletState();
}

class _WalletState extends State<Wallet> {
  var screen = [
      HomeWalletScreen(),
      CardSCreen(),
  ];

  int selectedTab = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(38, 81, 158, 1),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            title: Text("Home Wallet"),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.credit_card),
            title: Text("Card"),
          ),
        ],
        onTap: (index){
          setState(() {
            selectedTab = index;
          });
        },
        showUnselectedLabels: true,
        iconSize: 30,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){},
        elevation: 0,
        child: Icon(Icons.add),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      body: screen[selectedTab],
    );
  }
}
