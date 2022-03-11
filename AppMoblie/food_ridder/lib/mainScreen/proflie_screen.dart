import 'package:flutter/material.dart';
import 'package:food_ridder/global/global.dart';
import 'package:food_ridder/splashScreen/splash_screen.dart';
import 'package:food_ridder/widgets/simple_app_bar.dart';

class ProflieScreen extends StatefulWidget {
 

  @override
  _ProflieScreenState createState() => _ProflieScreenState();
}

class _ProflieScreenState extends State<ProflieScreen> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: SimpleAppBar(title: "Profile",),
        body: Container(
          
            
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  SizedBox(
                    height: 20,
                  ),
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
                            sharedPreferences!.getString("photoUrl")!
                          ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
               
                Text("Name : " + sharedPreferences!.getString("name")!,
                 style: TextStyle( 
                   fontSize: 20,
                  fontFamily: "Kiwi"
                ),),
                  Text("Email : " + sharedPreferences!.getString("email")!,
                 style: TextStyle( 
                   fontSize: 20,
                  fontFamily: "Kiwi"
                ),),
                  Text("Phone : " + sharedPreferences!.getString("phone")!,
                 style: TextStyle( 
                   fontSize: 20,
                  fontFamily: "Kiwi"
                ),),
                 Text("Address : " + sharedPreferences!.getString("address")!,
                 style: TextStyle( 
                   fontSize: 20,
                  fontFamily: "Kiwi"
                ),),
                  SizedBox(
                    height: 20,
                  ),
                  Container(
                     child: InkWell(
              onTap: (){
                Navigator.push(context, MaterialPageRoute(builder: (c)=> const MySplashScreen()));
              },
              child: Container(
                decoration: const BoxDecoration(
                    gradient: LinearGradient(
                        colors: [Colors.cyan, Colors.amber],
                        begin: FractionalOffset(0.0, 0.0),
                        end: FractionalOffset(1.0, 0.0),
                        stops: [0.0, 1.0],
                        tileMode: TileMode.clamp)),
                width: MediaQuery.of(context).size.width -40,
                height: 50,
                child: Center(
                  child: Text(
                    "Go Back",
                    style: TextStyle(color: Colors.white, fontSize: 15),

                  ),
                ),
              ),

            ),
                  )
                
                
                
                ],
                
              ),
          
          
        ),
      ),
      
    );
  }
}