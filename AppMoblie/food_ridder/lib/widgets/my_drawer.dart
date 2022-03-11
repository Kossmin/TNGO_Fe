import 'package:flutter/material.dart';
import 'package:food_ridder/authentication/auth_screen.dart';
import 'package:food_ridder/global/global.dart';
import 'package:food_ridder/mainScreen/proflie_screen.dart';
import 'package:food_ridder/mainScreen/qr_code_screen.dart';
import 'package:food_ridder/mainScreen/setting_screen.dart';
import 'package:food_ridder/mainScreen/station_screen.dart';
import 'package:food_ridder/widgets/wallet.dart';

class MyDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          //header drawer
          Container(
            padding: const EdgeInsets.only(top: 25, bottom: 10),
            child: Column(
              children: [
                Material(
                  borderRadius: const BorderRadius.all(Radius.circular(80)),
                  elevation: 10,
                  child: Padding(
                    padding: const EdgeInsets.all(1.0),
                    child: Container(
                      height: 160,
                      width: 160,
                      child: CircleAvatar(
                        backgroundImage: NetworkImage(
                            sharedPreferences!.getString("photoUrl")!),
                      ),
                    ),
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Text(
                  sharedPreferences!.getString("name")!,
                  style: TextStyle(
                      color: Colors.black, fontSize: 50, fontFamily: "Signatra"),
                ),
              ],
            ),
          ),

          const SizedBox(
            height: 12,
          ),

          //body drawer
          Container(
            padding: const EdgeInsets.only(top: 1.0),
            child: Column(
              children: [
                const Divider(
                  height: 10,
                  color: Colors.grey,
                  thickness: 2,
                ),
                ListTile(
                  leading: const Icon(
                    Icons.person,
                    color: Colors.black,
                  ),
                  title: const Text(
                    "Profile",
                    style: TextStyle(color: Colors.black),
                  ),
                  onTap: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (c) => ProflieScreen()));
                  },
                ),
                const Divider(
                  height: 10,
                  color: Colors.grey,
                  thickness: 2,
                ),
                ListTile(
                  leading: const Icon(
                    Icons.wallet_travel,
                    color: Colors.black,
                  ),
                  title: const Text(
                    "Wallet",
                    style: TextStyle(color: Colors.black),
                  ),
                  onTap: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (c) => Wallet()));
                  },
                ),

                const Divider(
                  height: 10,
                  color: Colors.grey,
                  thickness: 2,
                ),

                ListTile(
                  leading: const Icon(
                    Icons.museum,
                    color: Colors.black,
                  ),
                  title: const Text(
                    "Station",
                    style: TextStyle(color: Colors.black),
                  ),
                  onTap: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (c) => StatitionScreen()));
                  },
                ),


                const Divider(
                  height: 10,
                  color: Colors.grey,
                  thickness: 2,
                ),
                ListTile(
                  leading: const Icon(
                    Icons.access_time,
                    color: Colors.black,
                  ),
                  title: const Text(
                    "History",
                    style: TextStyle(color: Colors.black),
                  ),
                  onTap: () {
                   
                  },
                ),
                const Divider(
                  height: 10,
                  color: Colors.grey,
                  thickness: 2,
                ),

                ListTile(
                  leading: const Icon(
                    Icons.qr_code,
                    color: Colors.black,
                  ),
                  title: const Text(
                    "QR Scanner",
                    style: TextStyle(color: Colors.black),
                  ),
                  onTap: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (c) => BarcodeScannerScreen()));
                  },
                ),

                const Divider(
                  height: 10,
                  color: Colors.grey,
                  thickness: 2,
                ),

                ListTile(
                  leading: const Icon(
                    Icons.notifications,
                    color: Colors.black,
                  ),
                  title: const Text(
                    "Notification",
                    style: TextStyle(color: Colors.black),
                  ),
                  onTap: () {
                    // Navigator.push(context,
                    //     MaterialPageRoute(builder: (c) => NoticationScreen()));
                  },
                ),

                const Divider(
                  height: 10,
                  color: Colors.grey,
                  thickness: 2,
                ),

                ListTile(
                  leading: const Icon(
                    Icons.settings,
                    color: Colors.black,
                  ),
                  title: const Text(
                    "Settings",
                    style: TextStyle(color: Colors.black),
                  ),
                  onTap: () {
                     Navigator.push(context,
                        MaterialPageRoute(builder: (c) => SettingScreen()));
                  },
                ),
                const Divider(
                  height: 10,
                  color: Colors.grey,
                  thickness: 2,
                ),
                ListTile(
                  leading: const Icon(
                    Icons.exit_to_app,
                    color: Colors.black,
                  ),
                  title: const Text(
                    "Sign Out",
                    style: TextStyle(color: Colors.black),
                  ),
                  onTap: () {
                    firebaseAuth.signOut().then((value) {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (c) => const AuthScreen()));
                    });
                  },
                ),
                const Divider(
                  height: 10,
                  color: Colors.grey,
                  thickness: 2,
                ),
                Padding(
                  padding: const EdgeInsets.all(29),
                  child: Image.asset("images/3.png"),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
