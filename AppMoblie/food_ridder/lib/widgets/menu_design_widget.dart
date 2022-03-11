import 'package:flutter/material.dart';
import 'package:food_ridder/mainScreen/item_screen.dart';
import 'package:food_ridder/model/menu.dart';
class MenuDesignWidget extends StatefulWidget {

  Menus? model;
  BuildContext ?context;


  MenuDesignWidget({
    this.context, this.model
  });

  @override
  _MenuDesignWidgetState createState() => _MenuDesignWidgetState();
}

class _MenuDesignWidgetState extends State<MenuDesignWidget> {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: (){
        Navigator.push(context, MaterialPageRoute(builder: (c)=>ItemScreen(model : widget.model)));
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
                Text(
                  widget.model!.menuInfo!,
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 30,
                      fontFamily: "Signatra"

                  ),
                ),

                Text(
                  widget.model!.menuTitle!,
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 30,
                      fontFamily: "Signatra"

                  ),
                ),
                SizedBox(
                  height: 10,
                ),

                Image.network(widget.model!.thumbnailUrl!,
                  height: 150,
                  fit: BoxFit.cover,),

                SizedBox(height: 10,),


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