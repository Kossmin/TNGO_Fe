import 'package:flutter/material.dart';
import 'package:food_ridder/model/item.dart';
import 'package:food_ridder/widgets/simple_app_bar.dart';
import 'package:number_inc_dec/number_inc_dec.dart';

class ItemDetailScreen extends StatefulWidget {
  final Items? model;
  ItemDetailScreen({this.model});

  @override
  State<ItemDetailScreen> createState() => _ItemDetailScreenState();
}

class _ItemDetailScreenState extends State<ItemDetailScreen> {
  TextEditingController counterTextEditingController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SimpleAppBar(
        title: "TxGo",
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.network(widget.model!.thumbnailUrl!.toString()),
          SizedBox(
            height: 10,
          ),
          // Padding(
          //   padding: const EdgeInsets.only(right: 200),
          //   child: Text("Rental hours",
          //       style: TextStyle(
          //           fontSize: 20, fontFamily: "Kiwi", color: Colors.black)),
          // ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: NumberInputPrefabbed.roundedButtons(
              controller: counterTextEditingController,
              incDecBgColor: Colors.amber,
              min: 1 ,
              max: 24,
              initialValue: 1,
              buttonArrangement: ButtonArrangement.incRightDecLeft,
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              widget.model!.shortInfo.toString(),
              style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold

              ),
            ),
          ),
          SizedBox(height: 10,),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              widget.model!.title.toString(),
              style: TextStyle(
                fontSize: 20,


              ),
            ),
          ),
          SizedBox(height: 10,),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              "€"+ widget.model!.price.toString() + " /hour",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,

              ),
            ),
          ),
          SizedBox(height: 10,),
          Center(
            child: InkWell(
              onTap: (){

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
                  child: Text("Book", style : TextStyle(color: Colors.white)),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}