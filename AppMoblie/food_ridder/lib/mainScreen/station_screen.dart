import 'package:carousel_slider/carousel_slider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:food_ridder/model/seller.dart';
import 'package:food_ridder/widgets/info_design.dart';
import 'package:food_ridder/widgets/progress_bar.dart';
import 'package:food_ridder/widgets/simple_app_bar.dart';
import 'package:food_ridder/widgets/text_widget_header.dart';

class StatitionScreen extends StatefulWidget {
  const StatitionScreen({Key? key}) : super(key: key);

  @override
  _StatitionScreenState createState() => _StatitionScreenState();
}

class _StatitionScreenState extends State<StatitionScreen> {

  final items = [
    "slider/0.jpg",
    "slider/1.jpg",
    "slider/2.jpg",
    "slider/3.jpg",
  ];



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: SimpleAppBar(
        title: "Station",
      ),
      body: CustomScrollView(
        slivers: [
          SliverPersistentHeader(
              pinned: true, delegate: TextWidgetHeader(title: "District")),
          StreamBuilder<QuerySnapshot>(
            stream:
            FirebaseFirestore.instance.collection("sellers").snapshots(),
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
                  Sellers sModel = Sellers.fromJson(
                      snapshot.data!.docs[index].data()!
                      as Map<String, dynamic>);
                  //design for display sellers-cafes-restuarents
                  return InfoDesignWidget(
                    model: sModel,
                    context: context,
                  );
                },
                itemCount: snapshot.data!.docs.length,
              );
            },
          ),
        ],
      ),
    );
  }
}