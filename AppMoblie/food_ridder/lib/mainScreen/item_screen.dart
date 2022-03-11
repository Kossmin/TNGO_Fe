import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:food_ridder/model/item.dart';
import 'package:food_ridder/model/menu.dart';
import 'package:food_ridder/widgets/item_design_widget.dart';
import 'package:food_ridder/widgets/progress_bar.dart';
import 'package:food_ridder/widgets/text_widget_header.dart';



class ItemScreen extends StatefulWidget {
  final Menus? model;

  ItemScreen({
    this.model
  });

  @override
  _ItemScreenState createState() => _ItemScreenState();
}

class _ItemScreenState extends State<ItemScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(

      appBar: AppBar(
        title: Text(
          "station recent ",
          style: const TextStyle(fontSize: 30, fontFamily: "Signatra"),
        ),
        centerTitle: true,
        automaticallyImplyLeading: true,
        actions: [
          Stack(
            children: [ IconButton(
              icon: const Icon(
                Icons.post_add,
                color: Colors.cyan,
              ),
              onPressed: () {

              },
            ),
              Positioned(child: Stack(
                children:const [
                  Icon(Icons.brightness_1,
                    size: 20,
                    color: Colors.green,),
                  Positioned(
                    top: 3,
                    right: 3,
                    child: Center(
                      child: Text("0",style: TextStyle(color: Colors.white, fontSize: 12),

                      ),
                    ),
                  ),
                ],
              ))],
          )
        ],
        flexibleSpace: Container(
          decoration: const BoxDecoration(
              gradient: LinearGradient(
                  colors: [Colors.cyan, Colors.amber],
                  begin: FractionalOffset(0.0, 0.0),
                  end: FractionalOffset(1.0, 0.0),
                  stops: [0.0, 1.0],
                  tileMode: TileMode.clamp)),
        ),
      ),
      body: CustomScrollView(
        slivers: [
          SliverPersistentHeader(
              pinned: true, delegate: TextWidgetHeader(title: widget.model!.menuTitle.toString()  )),
          StreamBuilder<QuerySnapshot>(
            stream: FirebaseFirestore.instance
                .collection("sellers")
                .doc(widget.model!.sellerUID)
                .collection("menus")
                .doc(widget.model!.menuID)
                .collection("items")
                .orderBy("publishedDate",descending: true)
                .snapshots(),
            builder: (context, snapshot) {
              return !snapshot.hasData
                  ? SliverToBoxAdapter(
                child: Center(
                  child: circularProgress(),
                ),
              )
                  : SliverStaggeredGrid.countBuilder(
                crossAxisCount: 1,
                staggeredTileBuilder: (c) => StaggeredTile.fit(1),
                itemBuilder: (context, index) {
                  Items model = Items.fromJson(snapshot.data!.docs[index]
                      .data()! as Map<String, dynamic>);
                  return ItemDesignWidget(
                    model: model,
                    context: context,
                  );
                },
                itemCount: snapshot.data!.docs.length,
              );
            },
          )
        ],
      ),
    );
  }
}