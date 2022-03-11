import 'package:flutter/material.dart';
import 'package:food_ridder/authentication/auth_screen.dart';
import 'package:food_ridder/global/global.dart';
import 'package:food_ridder/mainScreen/map_screen.dart';
import 'package:food_ridder/widgets/my_drawer.dart';


class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
    appBar: AppBar(
      flexibleSpace: Container(
          decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Colors.cyan,
                  Colors.amber,
                ],
                begin:  FractionalOffset(0.0, 0.0),
                end:  FractionalOffset(1.0, 0.0),
                stops: [0.0, 1.0],
                tileMode: TileMode.clamp,
              )
          ),
        ),
        title: Text(sharedPreferences!.getString("name")!,),
        centerTitle: true,
      ),
     drawer: MyDrawer(),
     body: MapSample(),
    );
  }
}
