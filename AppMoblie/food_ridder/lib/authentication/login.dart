import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:food_ridder/authentication/auth_screen.dart';
import 'package:food_ridder/global/global.dart';
import 'package:food_ridder/main.dart';
import 'package:food_ridder/mainScreen/home_screen.dart';
import 'package:food_ridder/widgets/custom_text_filed.dart';
import 'package:food_ridder/widgets/error_dialog.dart';
import 'package:food_ridder/widgets/loading_dialog.dart';
import 'package:google_sign_in/google_sign_in.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> _formkey = GlobalKey<FormState>();
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  formValidation() {
    if (emailController.text.isNotEmpty && passwordController.text.isNotEmpty) {
      //login
      loginNow();
    } else {
      showDialog(
          context: context,
          builder: (c) {
            return ErrorDiaglog(
              message: "Please write email/password",
            );
          });
    }
  }

  loginNow() async {
    showDialog(
        context: context,
        builder: (c) {
          return LoadingDialog(
            message: "Checking Crendential",
          );
        });
    User? currentUser;
    await firebaseAuth
        .signInWithEmailAndPassword(
      email: emailController.text.trim(),
      password: passwordController.text.trim(),
    )
        .then((auth) {
      currentUser = auth.user!;
    }).catchError((error) {
      Navigator.pop(context);
      showDialog(
          context: context,
          builder: (c) {
            return ErrorDiaglog(
              message: error.message.toString(),
            );
          });
    });
    if (currentUser != null) {
      readDataAndSetDataLocally(currentUser!);
    }
  }

  Future readDataAndSetDataLocally(User currentUser) async {
    await FirebaseFirestore.instance
        .collection("riders")
        .doc(currentUser.uid)
        .get()
        .then((snapshot) async {
      if (snapshot.exists) {
        await sharedPreferences!.setString("uid", currentUser.uid);
        await sharedPreferences!
            .setString("email", snapshot.data()!["ridderrEmail"]);
        await sharedPreferences!
            .setString("name", snapshot.data()!["ridderName"]);
        await sharedPreferences!
            .setString("phone", snapshot.data()!["phone"]);
               await sharedPreferences!
            .setString("photoUrl", snapshot.data()!["ridderAvatarUrl"]);
             await sharedPreferences!
            .setString("address", snapshot.data()!["address"]);
        
        Navigator.pop(context);
        Navigator.push(
            context, MaterialPageRoute(builder: (c) => const HomeScreen()));
      }else{
          firebaseAuth.signOut();
           Navigator.pop(context);
           Navigator.push(
            context, MaterialPageRoute(builder: (c) => const AuthScreen()));
                showDialog(
          context: context,
          builder: (c) {
            return ErrorDiaglog(
              message: "no record exsits . ",
            );
          });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        mainAxisSize: MainAxisSize.max,
        children: [
          Container(
              alignment: Alignment.bottomCenter,
              child: Padding(
                padding: EdgeInsets.all(15),
                child: Image.asset(
                  "images/2.png",
                  height: 270,
                ),
              )),
          Form(
            key: _formkey,
            child: Column(
              children: [
                CustomeTextField(
                  data: Icons.email,
                  controller: emailController,
                  hintText: "email",
                  isObsecre: false,
                ),
                CustomeTextField(
                  data: Icons.lock,
                  controller: passwordController,
                  hintText: "Password",
                  isObsecre: true,
                ),
              ],
            ),
          ),

          ElevatedButton.icon(
            onPressed: ()=> {
            signInWithGoogle(),
            // Navigator.push(context,
            // MaterialPageRoute(builder: (c) => HomeScreen()))
          },
            label: const Text('Sign Up with Google'),
            style: ElevatedButton.styleFrom(
              primary: Colors.white,
              onPrimary: Colors.black,

            ),
            icon: Image.asset("images/Google_Logo.png",
              height: 32,
              width: 32,
            ),

          ),

          ElevatedButton(
            child: const Text(
              "Login",
              style:
                  TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
            style: ElevatedButton.styleFrom(
                primary: Colors.cyan,
                padding:
                    const EdgeInsets.symmetric(horizontal: 50, vertical: 20)),
            onPressed: () {
              formValidation();
            },            
          )


        ],
      ),
    );
  }
}
