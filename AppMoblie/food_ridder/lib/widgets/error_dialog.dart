import 'package:flutter/material.dart';

class ErrorDiaglog extends StatelessWidget {
  
  final String? message;
  ErrorDiaglog({this.message});


  @override
  Widget build(BuildContext context) {
    return AlertDialog(
        key: key,
        content: Text(message!),
        actions: [
          ElevatedButton(
            child: const Center(
              child: Text("ok"),
            ),
            style: ElevatedButton.styleFrom(
              primary: Colors.red,
            ),
            onPressed: (){
              Navigator.pop(context);
            },
          )
        ],
    );
  }
}