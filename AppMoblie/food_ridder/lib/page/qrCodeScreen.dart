import 'dart:developer';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:food_ridder/widgets/buttonWidget.dart';
import 'package:food_ridder/widgets/simple_app_bar.dart';

class QrCodeScanner extends StatefulWidget {
  @override
  _QrCodeScannerState createState() => _QrCodeScannerState();
}

class _QrCodeScannerState extends State<QrCodeScanner> {
  String qrCode = '';

  @override
  Widget build(BuildContext context) => Scaffold(
    backgroundColor: Color(0xFF313131),
    appBar: SimpleAppBar(title: "QR code Scanner",),
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
        Text(
        'Scan Result',
        style: TextStyle(
          fontSize: 16,
          color: Colors.white54,
          fontWeight: FontWeight.bold,
        ),
      ),
      SizedBox(height: 8),

        Text(
          '$qrCode',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
         SizedBox(height: 50),
        ButtonWidget(
          color: Colors.black26,
          text: 'Start QR scan',
          onClicked: () => scanQRCode(),
        ),
        ],
      ),
    ),
  );

  Future<void> scanQRCode() async {
    try {
      final qrCode = await FlutterBarcodeScanner.scanBarcode(
        '#ff6666',
        'Cancel',
        true,
        ScanMode.QR,
      );

      if (!mounted) return;

      setState(() {
        this.qrCode = qrCode.isEmpty
            ? ''
            : qrCode == '-1'
            ? ''
            : qrCode;
      });
    } on PlatformException {
      qrCode = 'Failed to get platform version.';
    }
  }
}