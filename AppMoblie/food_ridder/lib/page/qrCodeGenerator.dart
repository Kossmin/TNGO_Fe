import 'package:flutter/material.dart';
import 'package:food_ridder/widgets/simple_app_bar.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'dart:math' as math;
class QrCodeGenerator extends StatefulWidget {
  const QrCodeGenerator({ Key? key }) : super(key: key);

  @override
  _QrCodeGeneratorState createState() => _QrCodeGeneratorState();
}

class _QrCodeGeneratorState extends State<QrCodeGenerator> {
  final controller = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SimpleAppBar(title: "QR code Generator",),
      backgroundColor: Color(0xFF313131),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              QrImage(data: controller.text,
                size: math.min(MediaQuery.of(context).size.width, MediaQuery.of(context).size.height),
                backgroundColor: Colors.white,),
              SizedBox(
                  height: 40),

            ],
          ),
        ),
      ),

    );
  }


}