import 'package:flutter/material.dart';
import 'package:food_ridder/mainScreen/menu_screen.dart';
import 'package:food_ridder/model/seller.dart';
class InfoDesignWidget extends StatefulWidget {

  Sellers? model;
  BuildContext ?context;

  InfoDesignWidget({
    this.context, this.model
  });

  @override
  _InfoDesignWidgetState createState() => _InfoDesignWidgetState();
}

class _InfoDesignWidgetState extends State<InfoDesignWidget> {
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: (){
        Navigator.push(context, MaterialPageRoute(builder: (c)=> MenuScreen(model :widget.model )));
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
                  widget.model!.sellerName!,
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 50,
                      fontFamily: "Signatra"

                  ),
                ),
                SizedBox(
                  height: 10,
                ),

                Image.network(widget.model!.sellerAvatarUrl!),

              ],
            )
        ),
      ),
    );
  }
}