import 'package:flutter/material.dart';
import 'package:food_ridder/mainScreen/item_detail_screen.dart';
import 'package:food_ridder/model/item.dart';
class ItemDesignWidget extends StatefulWidget {

  Items? model;
  BuildContext ?context;

  ItemDesignWidget({
    this.context, this.model
  });

  @override
  _ItemDesignWidgetState createState() => _ItemDesignWidgetState();
}

class _ItemDesignWidgetState extends State<ItemDesignWidget> {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: (){
        Navigator.push(context, MaterialPageRoute(builder: (c)=> ItemDetailScreen(model : widget.model)));
      },
      splashColor: Colors.amber,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Container(
            height: 265,
            width: MediaQuery.of(context).size.width,
            child: Column(
              children: [
                Divider(
                  height: 4,
                  thickness: 3,
                  color: Colors.grey[300],

                ),

                SizedBox(
                  height: 10,
                ),
                Text(
                  widget.model!.shortInfo!,
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 50,
                      fontFamily: "Signatra"

                  ),
                ),
                SizedBox(
                  height: 10,
                ),

                Image.network(widget.model!.thumbnailUrl!,
                  height: 150,
                  fit: BoxFit.cover,),

                SizedBox(
                  height: 10,
                ),

                Divider(
                  height: 4,
                  thickness: 3,
                  color: Colors.grey[300],

                ),


              ],
            )
        ),
      ),
    );
  }
}